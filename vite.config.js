import { copyFile, cp, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { defineConfig } from 'vite';

const devDeskRelease = '20260801.6';

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

function versionDevDeskRuntime(html) {
  return html.replace(
    /(assets\/(?:css\/styles\.css|js\/(?:app|site-config|search-index)\.js)|site\.webmanifest)(?:\?v=[^"']+)?(?=["'])/g,
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
      },
    },
  ],
});
