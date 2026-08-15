import { copyFile, cp, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { defineConfig } from 'vite';
import { exportNotiVaultStatic } from './scripts/export-notivault-static.mjs';

const devDeskRelease = '20260813.1';

const devDeskRuntimeFiles = [
  '404.html',
  'downloads.html',
  'index.html',
  'releases.json',
  'robots.txt',
  'site.webmanifest',
  'sitemap.xml',
  'sw.js',
];

const constructionErpRuntimeFiles = [
  '404.html',
  'account-deletion.html',
  'data-safety.html',
  'downloads.html',
  'features.html',
  'index.html',
  'manifest.webmanifest',
  'manual.html',
  'privacy.html',
  'robots.txt',
  'sitemap.xml',
  'support.html',
  'terms.html',
  '_headers',
];

const shopPilotRuntimeFiles = [
  'data-deletion.html',
  'index.html',
  'manual.css',
  'manual.js',
  'privacy-policy.html',
  'quick-start.html',
  'robots.txt',
  'site.js',
  'sitemap.xml',
  'styles.css',
  'terms-of-service.html',
  'user-manual.html',
];

function versionDevDeskRuntime(html) {
  return html.replace(
    /(assets\/(?:css\/styles\.css|js\/(?:app|site-config|search-index|manual-visuals)\.js)|site\.webmanifest)(?:\?v=[^"']+)?(?=["'])/g,
    `$1?v=${devDeskRelease}`,
  );
}

async function versionHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await versionHtmlFiles(target);
    } else if (entry.name.endsWith('.html')) {
      const source = await readFile(target, 'utf8');
      await writeFile(target, versionDevDeskRuntime(source), 'utf8');
    }
  }));
}

export default defineConfig({
  plugins: [
    {
      name: 'copy-devdesk-static-runtime',
      async closeBundle() {
        const sourceRoot = path.resolve('devdesk');
        const outputRoot = path.resolve('dist', 'devdesk');
        await mkdir(outputRoot, { recursive: true });

        await Promise.all(
          devDeskRuntimeFiles.map((file) =>
            copyFile(path.join(sourceRoot, file), path.join(outputRoot, file)),
          ),
        );
        await cp(path.join(sourceRoot, 'manual'), path.join(outputRoot, 'manual'), {
          recursive: true,
        });
        await cp(path.join(sourceRoot, 'assets'), path.join(outputRoot, 'assets'), {
          recursive: true,
          filter: (source) => !source.endsWith('devdesk-logo-master.png'),
        });
        await versionHtmlFiles(outputRoot);

        const constructionSourceRoot = path.resolve('construction-erp');
        const constructionOutputRoot = path.resolve('dist', 'construction-erp');
        await mkdir(constructionOutputRoot, { recursive: true });
        await Promise.all(
          constructionErpRuntimeFiles.map((file) =>
            copyFile(
              path.join(constructionSourceRoot, file),
              path.join(constructionOutputRoot, file),
            ),
          ),
        );
        await cp(
          path.join(constructionSourceRoot, 'assets'),
          path.join(constructionOutputRoot, 'assets'),
          { recursive: true },
        );

        const shopPilotSourceRoot = path.resolve('shoppilot erp');
        const shopPilotOutputRoot = path.resolve('dist', 'shoppilot-erp');
        await mkdir(shopPilotOutputRoot, { recursive: true });
        await Promise.all(
          shopPilotRuntimeFiles.map((file) =>
            copyFile(
              path.join(shopPilotSourceRoot, file),
              path.join(shopPilotOutputRoot, file),
            ),
          ),
        );
        await cp(
          path.join(shopPilotSourceRoot, 'assets'),
          path.join(shopPilotOutputRoot, 'assets'),
          { recursive: true },
        );

        await exportNotiVaultStatic(
          path.resolve('.'),
          path.resolve('dist', 'notivault-website'),
        );

        const sitesServerRoot = path.resolve('dist', 'server');
        await mkdir(sitesServerRoot, { recursive: true });
        await copyFile(
          path.resolve('sites-worker.js'),
          path.join(sitesServerRoot, 'index.js'),
        );
      },
    },
  ],
});
