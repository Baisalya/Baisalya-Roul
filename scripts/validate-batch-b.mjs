import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const failures = [];
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const siteCss = await readFile(path.join(root, 'src/site/styles/site.css'), 'utf8');
const siteMain = await readFile(path.join(root, 'src/site/main.js'), 'utf8');

function requireText(source, expected, label = expected) {
  if (!source.includes(expected)) failures.push(`Batch B missing ${label}`);
}
function rejectText(source, unexpected, label = unexpected) {
  if (source.includes(unexpected)) failures.push(`Batch B must not contain ${label}`);
}
async function requireFile(relativePath) {
  try { await access(path.join(root, relativePath)); }
  catch { failures.push(`Batch B missing file: ${relativePath}`); }
}
async function rejectFile(relativePath) {
  try { await access(path.join(root, relativePath)); failures.push(`Batch B legacy file still present: ${relativePath}`); }
  catch { /* expected */ }
}

for (const [expected, label] of [
  ['Engineering choices shaped by the work', 'deep engineering profile'],
  ['Cross-platform product delivery', 'application engineering capability'],
  ['Offline and local-first systems', 'local-first capability'],
  ['Operational software, not isolated screens', 'workflow capability'],
  ['Shipping includes the reliability work.', 'release engineering capability'],
  ['Working stack', 'working stack architecture'],
  ['Understand</strong>', 'delivery process'],
]) requireText(html, expected, label);

for (const unexpected of ['skill-percentage', 'data-level=', 'TypingAnimation', 'ParticleSystemManager', 'TiltEffectManager']) {
  rejectText(`${html}\n${siteMain}`, unexpected, unexpected);
}

for (const expected of [
  "./core/theme.js",
  "./core/navigation.js",
  "./interactions/reveal.js",
]) requireText(siteMain, expected, `site module import ${expected}`);

for (const expected of [
  "./foundation/tokens.css",
  "./foundation/base.css",
  "./components/navigation.css",
  "./components/engineering.css",
  "./utilities/motion.css",
]) requireText(siteCss, expected, `style layer ${expected}`);

for (const file of [
  'src/site/core/theme.js',
  'src/site/core/navigation.js',
  'src/site/interactions/reveal.js',
  'src/site/utilities/motion.js',
  'src/site/styles/foundation/tokens.css',
  'src/site/styles/foundation/base.css',
  'src/site/styles/layout/shell.css',
  'src/site/styles/components/navigation.css',
  'src/site/styles/components/hero.css',
  'src/site/styles/components/about.css',
  'src/site/styles/components/software.css',
  'src/site/styles/components/engineering.css',
  'src/site/styles/components/contact.css',
  'src/site/styles/components/footer.css',
  'src/site/styles/utilities/motion.css',
]) await requireFile(file);

for (const file of [
  'src/site/runtime/legacy-root-runtime.js',
  'src/site/styles/legacy-root.css',
  'src/site/styles/professional-home.css',
]) await rejectFile(file);

if (failures.length) {
  failures.forEach((failure) => console.error(`ERROR: ${failure}`));
  process.exitCode = 1;
} else {
  console.log('Batch B engineering, runtime, and design-system architecture: passed');
}
