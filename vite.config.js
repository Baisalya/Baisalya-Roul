import { copyFile, cp, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { defineConfig } from 'vite';

const devDeskRuntimeFiles = [
  '404.html',
  'downloads.html',
  'index.html',
  'robots.txt',
  'site.webmanifest',
  'sitemap.xml',
  'sw.js',
];

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
      },
    },
  ],
});
