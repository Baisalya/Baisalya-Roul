import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root=process.cwd();
const failures=[];
const major=Number(process.versions.node.split('.')[0]);
if (major < 20) failures.push(`Node.js 20+ required; found ${process.versions.node}`);
async function exists(p){try{await access(path.join(root,p));return true}catch{return false}}
if (!(await exists('notivault-website/package-lock.json'))) failures.push('NotiVault package-lock.json missing.');
if (!(await exists('notivault-website/node_modules'))) failures.push('NotiVault dependencies missing. Run `npm ci --prefix notivault-website`.');
else {
  const pkg=JSON.parse(await readFile(path.join(root,'notivault-website/package.json'),'utf8'));
  if (!pkg.scripts?.build) failures.push('NotiVault build script missing.');
}
if (failures.length){failures.forEach(x=>console.error(`ERROR: ${x}`));process.exitCode=1}
else console.log('Release dependency preflight: passed');
