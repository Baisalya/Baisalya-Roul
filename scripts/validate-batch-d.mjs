import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
const root=process.cwd();
const failures=[];
const pkg=JSON.parse(await readFile(path.join(root,'package.json'),'utf8'));
const build=await readFile(path.join(root,'scripts/build-release.mjs'),'utf8');
const distValidator=await readFile(path.join(root,'scripts/validate-dist.mjs'),'utf8');
async function exists(p){try{await access(path.join(root,p));return true}catch{return false}}
function requireText(source,text,label=text){if(!source.includes(text)) failures.push(`Batch D missing ${label}`)}
function rejectText(source,text,label=text){if(source.includes(text)) failures.push(`Batch D must not contain ${label}`)}
requireText(pkg.scripts?.build??'', 'node scripts/build-release.mjs', 'deterministic Node build command');
requireText(pkg.scripts?.['build:plan']??'', '--plan', 'build-plan command');
requireText(pkg.scripts?.release??'', 'release:preflight', 'release preflight chain');
requireText(pkg.scripts?.release??'', 'test:dist', 'dist validation release gate');
if (pkg.devDependencies?.vite || pkg.dependencies?.vite) failures.push('Root build must not depend on Vite.');
if (await exists('vite.config.js')) failures.push('Obsolete root vite.config.js remains.');
for (const expected of [
  "const eduSheetRuntimeFiles", "path.join(outputRoot,'EduSheet')", "const surveyCamRuntimeFiles", "path.join(outputRoot,'surveycam')", 'exportNotiVaultStatic',
  'writeReleaseManifest', "path.join(notiVaultOutput,'public')", 'await rm(outputRoot',
]) requireText(build,expected,expected);
for (const expected of [
  "'EduSheet/index.html'", "'surveycam/index.html'", "'release-manifest.json'", 'validateReleaseManifest',
  "'notivault-website/public/og-deleted-message.png'",
]) requireText(distValidator,expected,expected);
if (!(await exists('scripts/protected-product-manifest.json'))) failures.push('Protected product manifest missing.');
if (!(await exists('scripts/validate-protected-products.mjs'))) failures.push('Protected product validator missing.');
if (failures.length){failures.forEach(x=>console.error(`ERROR: ${x}`));process.exitCode=1}
else console.log('Batch D build and release architecture: passed');
