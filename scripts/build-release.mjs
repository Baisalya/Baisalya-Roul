import { execFile } from 'node:child_process';
import { copyFile, cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';
import process from 'node:process';
import { promisify } from 'node:util';
import { exportNotiVaultStatic } from './export-notivault-static.mjs';

const execFileAsync = promisify(execFile);
const projectRoot = process.cwd();
const outputRoot = path.join(projectRoot, 'dist');
const planOnly = process.argv.includes('--plan');
const devDeskRelease = '20260824.4';

const rootRuntimeFiles = [
  'index.html', 'privacy.html', 'main.js', 'style.css', 'robots.txt', 'sitemap.xml', 'sitemap-pages.xml',
  'javascript.svg', 'CNAME',
];
const rootRuntimeDirectories = ['assets', 'src/site'];
const rootOptionalRuntimeFiles = ['ads.txt'];
const devDeskRuntimeFiles = [
  '404.html', 'downloads.html', 'index.html', 'privacy-policy.html', 'releases.json', 'robots.txt',
  'site.webmanifest', 'sitemap.xml', 'sw.js',
];
const constructionErpRuntimeFiles = [
  '404.html', 'account-deletion.html', 'data-safety.html', 'downloads.html',
  'features.html', 'index.html', 'manifest.webmanifest', 'manual.html',
  'privacy.html', 'robots.txt', 'sitemap.xml', 'support.html', 'terms.html',
];
const constructionErpOptionalRuntimeFiles = ['_headers'];
const shopPilotRuntimeFiles = [
  'data-deletion.html', 'index.html', 'manual.css', 'manual.js', 'privacy-policy.html',
  'quick-start.html', 'robots.txt', 'site.js', 'sitemap.xml', 'styles.css',
  'terms-of-service.html', 'user-manual.html',
];
const eduSheetRuntimeFiles = [
  '404.html', 'download.html', 'features.html', 'index.html', 'manual.html',
  'privacy.html', 'quick-start.html', 'robots.txt', 'sitemap.xml',
];
const surveyCamRuntimeFiles = [
  'index.html', 'privacy.html', 'support.html', 'robots.txt', 'sitemap.xml', 'site.js', 'styles.css',
];
const siteSnapRuntimeFiles = ['index.html', 'sitemap.xml'];

async function isFile(relativePath) {
  try { return (await stat(path.join(projectRoot, relativePath))).isFile(); }
  catch { return false; }
}
async function isDirectory(relativePath) {
  try { return (await stat(path.join(projectRoot, relativePath))).isDirectory(); }
  catch { return false; }
}
async function requireSourceFile(relativePath) {
  if (!(await isFile(relativePath))) throw new Error(`Release source missing file: ${relativePath}`);
}
async function requireSourceDirectory(relativePath) {
  if (!(await isDirectory(relativePath))) throw new Error(`Release source missing directory: ${relativePath}`);
}
async function copyFiles(sourceDir, outputDir, files) {
  await mkdir(outputDir, { recursive: true });
  await Promise.all(files.map((file) => copyFile(path.join(sourceDir, file), path.join(outputDir, file))));
}
function versionDevDeskRuntime(html) {
  return html.replace(
    /(assets\/(?:css\/styles\.css|js\/(?:app|site-config|search-index|manual-visuals|marketing-model)\.js)|site\.webmanifest)(?:\?v=[^"']+)?(?=["'])/g,
    `$1?v=${devDeskRelease}`,
  );
}
async function versionHtmlFiles(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) await versionHtmlFiles(target);
    else if (entry.name.endsWith('.html')) {
      await writeFile(target, versionDevDeskRuntime(await readFile(target, 'utf8')), 'utf8');
    }
  }
}
function canonicalUrlForHtml(relativePath) {
  const normalized = relativePath.replaceAll('\\', '/');
  if (normalized === 'index.html') return 'https://baisalya.com/';
  if (normalized.endsWith('/index.html')) {
    return `https://baisalya.com/${normalized.slice(0, -'index.html'.length)}`;
  }
  return `https://baisalya.com/${normalized}`;
}
function upsertHeadElement(html, matcher, element) {
  return matcher.test(html)
    ? html.replace(matcher, element)
    : html.replace('</head>', `    ${element}\n</head>`);
}
async function ensureSeoMetadata(directory, relative = '') {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    const nextRelative = path.posix.join(relative, entry.name);
    if (entry.isDirectory()) {
      await ensureSeoMetadata(target, nextRelative);
      continue;
    }
    if (!entry.name.endsWith('.html')) continue;

    let html = await readFile(target, 'utf8');
    const isNotFound = entry.name.toLowerCase() === '404.html';
    const isRedirect = /<meta\b(?=[^>]*\bhttp-equiv=["']refresh["'])[^>]*>/i.test(html);
    const robots = isNotFound || isRedirect
      ? '<meta name="robots" content="noindex, follow">'
      : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">';
    html = upsertHeadElement(
      html,
      /<meta\b(?=[^>]*\bname=["']robots["'])[^>]*>/i,
      robots,
    );

    if (!isNotFound && !isRedirect) {
      const canonical = canonicalUrlForHtml(nextRelative);
      html = upsertHeadElement(
        html,
        /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i,
        `<link rel="canonical" href="${canonical}">`,
      );
      html = upsertHeadElement(
        html,
        /<meta\b(?=[^>]*\bproperty=["']og:url["'])[^>]*>/i,
        `<meta property="og:url" content="${canonical}">`,
      );
    }
    await writeFile(target, html, 'utf8');
  }
}
async function injectShopPilotManualAds(outputDir) {
  const pages = ['index.html', 'quick-start.html', 'user-manual.html'];
  const css = '<link rel="stylesheet" href="../assets/monetization/monetization.css">';
  const placement = '<aside class="monetization-ad" data-ad-unit="manual" hidden aria-label="Advertisement"></aside>';
  const configScript = '<script src="../assets/monetization/config.js"></script>';
  const runtimeScript = '<script src="../assets/monetization/monetization.js" defer></script>';
  for (const page of pages) {
    const file = path.join(outputDir, page);
    let html = await readFile(file, 'utf8');
    if (!html.includes('assets/monetization/monetization.css')) {
      html = html.replace('</head>', '    ' + css + '\n</head>');
    }
    if (!html.includes('data-ad-unit="manual"')) {
      html = /<footer\b/i.test(html)
        ? html.replace(/<footer\b/i, placement + '\n<footer')
        : html.replace('</body>', placement + '\n</body>');
    }
    if (!html.includes('assets/monetization/config.js')) {
      html = html.replace('</body>', configScript + runtimeScript + '\n</body>');
    }
    await writeFile(file, html, 'utf8');
  }
}

async function validateSourcePlan() {
  for (const file of rootRuntimeFiles) await requireSourceFile(file);
  for (const directory of rootRuntimeDirectories) await requireSourceDirectory(directory);
  for (const file of devDeskRuntimeFiles) await requireSourceFile(path.join('devdesk', file));
  await requireSourceDirectory('devdesk/manual');
  await requireSourceDirectory('devdesk/assets');
  for (const file of constructionErpRuntimeFiles) await requireSourceFile(path.join('construction-erp', file));
  await requireSourceDirectory('construction-erp/assets');
  for (const file of shopPilotRuntimeFiles) await requireSourceFile(path.join('shoppilot erp', file));
  await requireSourceDirectory('shoppilot erp/assets');
  for (const file of eduSheetRuntimeFiles) await requireSourceFile(path.join('EduSheet', file));
  await requireSourceDirectory('EduSheet/assets');
  for (const file of surveyCamRuntimeFiles) await requireSourceFile(path.join('surveycam', file));
  await requireSourceDirectory('surveycam/assets');
  for (const file of siteSnapRuntimeFiles) await requireSourceFile(path.join('sitesnap', file));
  await requireSourceFile('notivault-website/package.json');
  await requireSourceFile('notivault-website/sitemap.xml');
  await requireSourceFile('notivault-website/index.html');
  await requireSourceFile('notivault-website/privacy-policy/index.html');
  await requireSourceDirectory('notivault-website/public');
  await requireSourceFile('sites-worker.js');
}
async function assertNotiVaultBuildReady() {
  const packageJson = JSON.parse(await readFile(path.join(projectRoot, 'notivault-website/package.json'), 'utf8'));
  if (!packageJson.scripts?.build) throw new Error('NotiVault package.json does not define a build script.');
  if (!(await isDirectory('notivault-website/node_modules'))) {
    throw new Error(
      'NotiVault release dependencies are not installed. Run `npm ci --prefix notivault-website` before `npm run build`.',
    );
  }
}

async function addNotiVaultRevenueSurface(outputDir) {
  const file = path.join(outputDir, 'index.html');
  let html = await readFile(file, 'utf8');
  const styleLink = '<link rel="stylesheet" href="../assets/monetization/monetization.css">';
  const support = '<aside class="creator-support" aria-label="Support NotiVault development"><div class="creator-support__copy"><span class="creator-support__eyebrow">Independent software</span><strong>Support thoughtful NotiVault development</strong><p>Support privacy-focused Android development directly. The NotiVault website intentionally has no advertising slot.</p></div><div class="creator-support__actions"><a href="https://www.buymeacoffee.com/baisalya" target="_blank" rel="noopener noreferrer">Buy me a coffee ↗</a><a href="mailto:baishalya1999@gmail.com?subject=NotiVault%20business%20inquiry">Business inquiry</a></div></aside>';
  if (!html.includes('assets/monetization/monetization.css')) html = html.replace('</head>', styleLink + '</head>');
  if (!html.includes('creator-support')) html = html.replace(/<footer\b/i, support + '<footer');
  await writeFile(file, html, 'utf8');
}

async function writeReleaseManifest() {
  const files=[];
  async function walk(directory) {
    for (const entry of await readdir(directory,{withFileTypes:true})) {
      const target=path.join(directory,entry.name);
      if (entry.isDirectory()) await walk(target);
      else if (entry.name !== 'release-manifest.json') {
        const data=await readFile(target);
        files.push({
          path:path.relative(outputRoot,target).replaceAll('\\','/'),
          bytes:data.length,
          sha256:crypto.createHash('sha256').update(data).digest('hex'),
        });
      }
    }
  }
  await walk(outputRoot);
  files.sort((a,b)=>a.path.localeCompare(b.path));
  await writeFile(path.join(outputRoot,'release-manifest.json'), JSON.stringify({
    schema:1,
    site:'baisalya.com',
    devdesk_release:devDeskRelease,
    file_count:files.length,
    files,
  },null,2)+'\n','utf8');
}

await validateSourcePlan();
if (planOnly) {
  console.log('Release build plan: passed');
  console.log(`Root files: ${rootRuntimeFiles.length}; products: DevDesk, Construction ERP, ShopPilot, EduSheet, SurveyCam, NotiVault.`);
  process.exit(0);
}
await assertNotiVaultBuildReady();
await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

for (const file of rootRuntimeFiles) await copyFile(path.join(projectRoot,file), path.join(outputRoot,file));
for (const file of rootOptionalRuntimeFiles) { if (await isFile(file)) await copyFile(path.join(projectRoot,file), path.join(outputRoot,file)); }
for (const directory of rootRuntimeDirectories) {
  await cp(path.join(projectRoot,directory), path.join(outputRoot,directory), {recursive:true,force:true});
}

const devDeskOutput=path.join(outputRoot,'devdesk');
await copyFiles(path.join(projectRoot,'devdesk'), devDeskOutput, devDeskRuntimeFiles);
await cp(path.join(projectRoot,'devdesk','manual'), path.join(devDeskOutput,'manual'), {recursive:true,force:true});
await cp(path.join(projectRoot,'devdesk','assets'), path.join(devDeskOutput,'assets'), {
  recursive:true, force:true, filter:(source)=>!source.endsWith('devdesk-logo-master.png'),
});
await versionHtmlFiles(devDeskOutput);

const constructionOutput=path.join(outputRoot,'construction-erp');
await copyFiles(path.join(projectRoot,'construction-erp'), constructionOutput, constructionErpRuntimeFiles);
for (const file of constructionErpOptionalRuntimeFiles) {
  if (await isFile(path.join('construction-erp', file))) {
    await copyFile(path.join(projectRoot,'construction-erp',file), path.join(constructionOutput,file));
  }
}
await cp(path.join(projectRoot,'construction-erp','assets'), path.join(constructionOutput,'assets'), {recursive:true,force:true});

const shopPilotOutput=path.join(outputRoot,'shoppilot-erp');
await copyFiles(path.join(projectRoot,'shoppilot erp'), shopPilotOutput, shopPilotRuntimeFiles);
await cp(path.join(projectRoot,'shoppilot erp','assets'), path.join(shopPilotOutput,'assets'), {recursive:true,force:true});
await injectShopPilotManualAds(shopPilotOutput);

const eduSheetOutput=path.join(outputRoot,'EduSheet');
await copyFiles(path.join(projectRoot,'EduSheet'), eduSheetOutput, eduSheetRuntimeFiles);
await cp(path.join(projectRoot,'EduSheet','assets'), path.join(eduSheetOutput,'assets'), {recursive:true,force:true});

const surveyCamOutput=path.join(outputRoot,'surveycam');
await copyFiles(path.join(projectRoot,'surveycam'), surveyCamOutput, surveyCamRuntimeFiles);
await cp(path.join(projectRoot,'surveycam','assets'), path.join(surveyCamOutput,'assets'), {recursive:true,force:true});

const siteSnapOutput=path.join(outputRoot,'sitesnap');
await copyFiles(path.join(projectRoot,'sitesnap'), siteSnapOutput, siteSnapRuntimeFiles);

const notiVaultOutput=path.join(outputRoot,'notivault-website');
await exportNotiVaultStatic(projectRoot, notiVaultOutput);
await addNotiVaultRevenueSurface(notiVaultOutput);
await copyFile(path.join(projectRoot,'notivault-website','sitemap.xml'), path.join(notiVaultOutput,'sitemap.xml'));
// The root professional home deliberately uses the checked-in public preview path.
await cp(path.join(projectRoot,'notivault-website','public'), path.join(notiVaultOutput,'public'), {recursive:true,force:true});

const serverOutput=path.join(outputRoot,'server');
await mkdir(serverOutput,{recursive:true});
await copyFile(path.join(projectRoot,'sites-worker.js'),path.join(serverOutput,'index.js'));
await ensureSeoMetadata(outputRoot);
await writeReleaseManifest();
console.log('Production release build: passed');
