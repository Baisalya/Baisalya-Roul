import { execFile } from 'node:child_process';
import { readFile, stat, writeFile } from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';
import process from 'node:process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const root = process.cwd();
const manifestPath = path.join(root, 'scripts', 'protected-product-manifest.json');
const protectedRoots = [
  'devdesk',
  'construction-erp',
  'EduSheet',
  'notivault-website',
  'shoppilot erp',
  'shoppilot-erp',
];

function canonicalBytes(data) {
  if (data.includes(0)) return data;
  return Buffer.from(data.toString('utf8').replaceAll('\r\n', '\n'), 'utf8');
}

const { stdout } = await execFileAsync(
  'git',
  ['ls-files', '-z', '--cached', '--others', '--exclude-standard', '--', ...protectedRoots],
  { cwd: root, encoding: 'buffer', maxBuffer: 16 * 1024 * 1024 },
);

const paths = stdout
  .toString('utf8')
  .split('\0')
  .filter(Boolean)
  .map((file) => file.replaceAll('\\', '/'))
  .sort((a, b) => a.localeCompare(b));

const files = [];
for (const relativePath of paths) {
  const absolutePath = path.join(root, relativePath);
  if (!(await stat(absolutePath)).isFile()) continue;
  const data = await readFile(absolutePath);
  const canonical = canonicalBytes(data);
  files.push({
    path: relativePath,
    sha256: crypto.createHash('sha256').update(canonical).digest('hex'),
    bytes: canonical.length,
  });
}

const manifest = {
  version: 3,
  baseline: 'Current protected product source snapshot',
  protected_roots: protectedRoots,
  file_count: files.length,
  files,
};

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(`Protected product baseline refreshed (${files.length} files).`);
console.log('Review the manifest diff before committing it.');
