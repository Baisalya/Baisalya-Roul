import { access, readFile, readdir, stat } from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';
import process from 'node:process';

const root=path.resolve('dist');
const failures=[];
const forbiddenPublicMarkers=[
  'https://baisalya.github.io/Baisalya-Roul/',
  'REPLACE-WITH-YOUR-SITE-URL',
];
async function exists(relativePath){try{await access(path.join(root,relativePath));return true}catch{failures.push(`Missing production output: ${relativePath}`);return false}}
function isExternal(value){return !value || value.startsWith('#') || /^(?:https?:|mailto:|tel:|data:|blob:)/.test(value)}
async function validateRef(fromFile,value){
  if(isExternal(value)) return;
  const pathname=decodeURIComponent(value.split(/[?#]/,1)[0]); if(!pathname) return;
  const dir=path.posix.dirname(fromFile.replaceAll('\\','/'));
  const target=pathname.startsWith('/')?pathname.slice(1):path.posix.normalize(path.posix.join(dir,pathname));
  await exists(target.endsWith('/')?`${target}index.html`:target);
}
async function validateLocalReferences(relativeFile){
  if(!(await exists(relativeFile))) return;
  const source=await readFile(path.join(root,relativeFile),'utf8');
  const ext=path.extname(relativeFile).toLowerCase();
  const refs=[];
  if(ext==='.html'){
    refs.push(...[...source.matchAll(/\b(?:href|src)="([^"]+)"/g)].map(m=>m[1]));
  } else if(ext==='.css'){
    refs.push(...[...source.matchAll(/@import\s+(?:url\()?['"]?([^'"\s)]+)["']?\)?/g)].map(m=>m[1]));
    refs.push(...[...source.matchAll(/url\(\s*['"]?([^'"\s)]+)["']?\s*\)/g)].map(m=>m[1]));
  } else if(['.js','.mjs'].includes(ext)){
    refs.push(...[...source.matchAll(/\bimport\s+(?:[^'"]+?\s+from\s+)?['"]([^'"]+)['"]/g)].map(m=>m[1]));
    refs.push(...[...source.matchAll(/\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/g)].map(m=>m[1]));
  }
  for(const ref of refs) await validateRef(relativeFile,ref);
}
function canonicalUrlForHtml(relativeFile){
  const normalized=relativeFile.replaceAll('\\','/');
  if(normalized==='index.html') return 'https://baisalya.com/';
  if(normalized.endsWith('/index.html')) return `https://baisalya.com/${normalized.slice(0,-'index.html'.length)}`;
  return `https://baisalya.com/${normalized}`;
}
async function validateSeoAndPublicMarkers(relativeFile){
  const source=await readFile(path.join(root,relativeFile),'utf8');
  for(const marker of forbiddenPublicMarkers){
    if(source.includes(marker)) failures.push(`Stale public URL marker in ${relativeFile}: ${marker}`);
  }
  if(!relativeFile.endsWith('.html')) return;
  const isNotFound=path.posix.basename(relativeFile).toLowerCase()==='404.html';
  const isRedirect=/<meta\b(?=[^>]*\bhttp-equiv=["']refresh["'])[^>]*>/i.test(source);
  const robotsTag=source.match(/<meta\b(?=[^>]*\bname=["']robots["'])[^>]*>/i)?.[0]??'';
  const robotsDirectives=(robotsTag.match(/\bcontent=["']([^"']*)["']/i)?.[1]??'')
    .toLowerCase().split(',').map(value=>value.trim());
  if(isNotFound||isRedirect){
    if(!robotsDirectives.includes('noindex')) failures.push(`Non-indexable page is missing noindex robots metadata: ${relativeFile}`);
    return;
  }
  const canonicalTag=source.match(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i)?.[0]??'';
  const canonical=canonicalTag.match(/\bhref=["']([^"']+)["']/i)?.[1]??'';
  const expected=canonicalUrlForHtml(relativeFile);
  if(canonical!==expected) failures.push(`Canonical mismatch in ${relativeFile}: expected ${expected}, found ${canonical||'(missing)'}`);
  if(!robotsDirectives.includes('index')||robotsDirectives.includes('noindex')) failures.push(`Indexable page is missing index robots metadata: ${relativeFile}`);
}
async function walk(directory,relative=''){
  for(const entry of await readdir(directory,{withFileTypes:true})){
    const rel=path.posix.join(relative,entry.name); const abs=path.join(directory,entry.name);
    if(entry.isDirectory()) await walk(abs,rel);
    else {
      if(/\.(?:html|css|js|mjs)$/.test(entry.name)) await validateLocalReferences(rel);
      if(/\.(?:html|xml|txt|json|js|mjs|webmanifest)$/.test(entry.name)) await validateSeoAndPublicMarkers(rel);
    }
  }
}
async function validateSitemaps(){
  const expectedChildren=[
    'sitemap-pages.xml',
    'devdesk/sitemap.xml',
    'construction-erp/sitemap.xml',
    'shoppilot-erp/sitemap.xml',
    'EduSheet/sitemap.xml',
    'surveycam/sitemap.xml',
  ];
  const indexSource=await readFile(path.join(root,'sitemap.xml'),'utf8');
  if(!indexSource.includes('<sitemapindex')) failures.push('Root sitemap.xml is not a sitemap index.');
  for(const child of expectedChildren){
    const publicUrl=`https://baisalya.com/${child}`;
    if(!indexSource.includes(`<loc>${publicUrl}</loc>`)) failures.push(`Root sitemap index missing: ${publicUrl}`);
    await exists(child);
  }
  for(const child of expectedChildren){
    if(!(await exists(child))) continue;
    const source=await readFile(path.join(root,child),'utf8');
    if(!source.includes('<urlset')) failures.push(`Child sitemap is not a URL set: ${child}`);
    const locations=[...source.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>match[1]);
    if(locations.length===0) failures.push(`Child sitemap has no URLs: ${child}`);
    for(const location of locations){
      let url;
      try{url=new URL(location)}catch{failures.push(`Invalid sitemap URL in ${child}: ${location}`);continue}
      if(url.protocol!=='https:'||url.hostname!=='baisalya.com') failures.push(`Non-canonical sitemap URL in ${child}: ${location}`);
      const pathname=decodeURIComponent(url.pathname).replace(/^\//,'');
      await exists(pathname.endsWith('/')?`${pathname}index.html`:pathname||'index.html');
    }
  }
}
async function validateReleaseManifest(){
  if(!(await exists('release-manifest.json'))) return;
  const manifest=JSON.parse(await readFile(path.join(root,'release-manifest.json'),'utf8'));
  let checked=0;
  for(const item of manifest.files??[]){
    try{
      const data=await readFile(path.join(root,item.path));
      const hash=crypto.createHash('sha256').update(data).digest('hex');
      if(hash!==item.sha256) failures.push(`Release manifest hash mismatch: ${item.path}`);
      if(data.length!==item.bytes) failures.push(`Release manifest size mismatch: ${item.path}`);
      checked++;
    }catch{failures.push(`Release manifest file missing: ${item.path}`)}
  }
  if(checked!==manifest.file_count) failures.push(`Release manifest count mismatch: expected ${manifest.file_count}, checked ${checked}`);
}

for(const required of [
  'index.html','privacy.html','style.css','main.js','robots.txt','sitemap.xml','sitemap-pages.xml','assets/brand/baisalya-og.png',
  'assets/monetization/config.js','assets/monetization/monetization.js','assets/monetization/monetization.css',
  'src/site/main.js','devdesk/index.html','construction-erp/index.html','shoppilot-erp/index.html',
  'EduSheet/index.html','EduSheet/assets/css/styles.css','surveycam/index.html','surveycam/privacy.html',
  'surveycam/support.html','surveycam/assets/surveycam-logo.png','notivault-website/index.html',
  'notivault-website/privacy-policy/index.html','notivault-website/public/og-deleted-message.png',
  'server/index.js','release-manifest.json',
]) await exists(required);

await walk(root);
await validateSitemaps();
await validateReleaseManifest();

const index=await readFile(path.join(root,'index.html'),'utf8');
for(const expected of ['https://baisalya.com/','href="EduSheet/index.html"','href="surveycam/index.html"','href="notivault-website/"']){
  if(!index.includes(expected)) failures.push(`Production root identity missing: ${expected}`);
}
const monetizationConfig=await readFile(path.join(root,'assets/monetization/config.js'),'utf8');
const notiVaultHome=await readFile(path.join(root,'notivault-website/index.html'),'utf8');
for(const expected of ['creator-support','https://www.buymeacoffee.com/baisalya','baishalya1999@gmail.com']){
  if(!notiVaultHome.includes(expected)) failures.push(`Production NotiVault revenue surface missing: ${expected}`);
}
const adsEnabled=monetizationConfig.includes('enabled: true');
if(adsEnabled){
  if(!monetizationConfig.includes('consentReady: true')) failures.push('AdSense enabled without consent-ready gate.');
  if(!/ca-pub-\d{10,20}/.test(monetizationConfig)) failures.push('AdSense enabled without a valid publisher client.');
  if(!(await exists('ads.txt'))) failures.push('AdSense enabled but ads.txt is missing.');
}
for(const forbidden of ['vite.config.js','package.json','package-lock.json','BATCH_A_REFACTOR_REPORT.md']){
  try{await access(path.join(root,forbidden));failures.push(`Source-only file leaked into dist: ${forbidden}`)}catch{}
}
if(failures.length){[...new Set(failures)].forEach(x=>console.error(`ERROR: ${x}`));process.exitCode=1}
else console.log('Production output graph, products, and release manifest: passed');
