import { execFile } from 'node:child_process';
import { copyFile, cp, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const publicSiteBase =
  'https://baisalya.com/notivault-website/';

function makeStaticHtml(source, page) {
  const onHomePage = page === 'home';
  const assetPrefix = onHomePage ? './' : '../';
  const homePage = onHomePage ? './index.html' : '../index.html';
  const privacyPage = onHomePage
    ? './privacy-policy/index.html'
    : './index.html';

  return source
    .replace(
      /<script\b([^>]*)>[\s\S]*?<\/script>/gi,
      (match, attributes) =>
        /\btype=["']application\/ld\+json["']/i.test(attributes) ? match : '',
    )
    .replace(/<link\b(?=[^>]*\brel="modulepreload")[^>]*\/?\s*>/gi, '')
    .replaceAll('https://notivault.local/', publicSiteBase)
    .replaceAll('url(/_next/', `url(${assetPrefix}_next/`)
    .replaceAll('="/_next/', `="${assetPrefix}_next/`)
    .replaceAll('href="/privacy-policy"', `href="${privacyPage}"`)
    .replaceAll('href="/#', `href="${homePage}#`)
    .replaceAll('href="/"', `href="${homePage}"`)
    .replaceAll('href="/favicon.svg"', `href="${assetPrefix}favicon.svg"`)
    .replaceAll(
      'href="/og-deleted-message.png"',
      `href="${assetPrefix}og-deleted-message.png"`,
    )
    .replaceAll('href="/og.png"', `href="${assetPrefix}og.png"`)
    .replaceAll('src="/favicon.svg"', `src="${assetPrefix}favicon.svg"`)
    .replaceAll(
      'src="/og-deleted-message.png"',
      `src="${assetPrefix}og-deleted-message.png"`,
    )
    .replaceAll('src="/og.png"', `src="${assetPrefix}og.png"`)
    .replace(/\n{3,}/g, '\n\n');
}

async function render(worker, route) {
  const response = await worker.fetch(
    new Request(new URL(route, 'https://notivault.local'), {
      headers: {
        accept: 'text/html',
        host: 'notivault.local',
        'user-agent': 'facebookexternalhit/1.1',
        'x-forwarded-host': 'notivault.local',
        'x-forwarded-proto': 'https',
      },
    }),
    {
      ASSETS: {
        fetch: async () => new Response('Not found', { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  if (!response.ok) {
    throw new Error(`NotiVault static render failed for ${route}: ${response.status}`);
  }

  return response.text();
}

export async function exportNotiVaultStatic(projectRoot, outputRoot) {
  const sourceRoot = path.join(projectRoot, 'notivault-website');
  const npmCli =
    process.env.npm_execpath ??
    path.join(
      path.dirname(process.execPath),
      'node_modules',
      'npm',
      'bin',
      'npm-cli.js',
    );

  const { stdout, stderr } = await execFileAsync(
    process.execPath,
    [npmCli, 'run', 'build'],
    {
      cwd: sourceRoot,
      maxBuffer: 10 * 1024 * 1024,
      windowsHide: true,
    },
  );
  if (stdout) process.stdout.write(stdout);
  if (stderr) process.stderr.write(stderr);

  const clientRoot = path.join(sourceRoot, 'dist', 'client');
  const workerPath = path.join(sourceRoot, 'dist', 'server', 'index.js');
  const workerUrl = pathToFileURL(workerPath);
  workerUrl.searchParams.set('static-export', Date.now().toString());
  const { default: worker } = await import(workerUrl.href);

  const [homeHtml, privacyHtml] = await Promise.all([
    render(worker, '/'),
    render(worker, '/privacy-policy'),
  ]);

  async function writeStaticSite(targetRoot) {
    const nextStaticRoot = path.join(targetRoot, '_next', 'static');
    await mkdir(nextStaticRoot, { recursive: true });
    await cp(
      path.join(clientRoot, '_next', 'static', 'css'),
      path.join(nextStaticRoot, 'css'),
      { recursive: true, force: true },
    );
    await cp(
      path.join(clientRoot, '_next', 'static', '_vinext_fonts'),
      path.join(nextStaticRoot, '_vinext_fonts'),
      { recursive: true, force: true },
    );
    for (const publicFile of [
      'favicon.svg',
      'og-deleted-message.png',
      'og.png',
    ]) {
      await copyFile(
        path.join(sourceRoot, 'public', publicFile),
        path.join(targetRoot, publicFile),
      );
    }
    await mkdir(path.join(targetRoot, 'privacy-policy'), { recursive: true });
    await writeFile(
      path.join(targetRoot, 'index.html'),
      makeStaticHtml(homeHtml, 'home'),
      'utf8',
    );
    await writeFile(
      path.join(targetRoot, 'privacy-policy', 'index.html'),
      makeStaticHtml(privacyHtml, 'privacy'),
      'utf8',
    );
  }

  // Build output only. Do not rewrite checked-in protected source HTML during release.
  await writeStaticSite(outputRoot);
}
