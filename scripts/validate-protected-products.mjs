import { readFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import crypto from 'node:crypto';
import path from 'node:path';
import process from 'node:process';
import { promisify } from 'node:util';
const root=process.cwd();
const manifest=JSON.parse(await readFile(path.join(root,'scripts/protected-product-manifest.json'),'utf8'));
const failures=[];
let checked=0;
for (const item of manifest.files){
  try {
    const data=await readFile(path.join(root,item.path));
    const hash=crypto.createHash('sha256').update(data).digest('hex');
    if (hash!==item.sha256) failures.push(`${item.path} changed from protected baseline.`);
    checked++;
  } catch { failures.push(`${item.path} is missing from protected baseline.`); }
}
if (checked!==manifest.file_count) failures.push(`Protected file count mismatch: expected ${manifest.file_count}, checked ${checked}.`);
const execFileAsync=promisify(execFile);
const {stdout}=await execFileAsync('git',['ls-files','-z','--cached','--others','--exclude-standard','--',...manifest.protected_roots],{cwd:root,encoding:'buffer',maxBuffer:16*1024*1024});
const currentPaths=new Set(stdout.toString('utf8').split('\0').filter(Boolean).map(file=>file.replaceAll('\\','/')));
const baselinePaths=new Set(manifest.files.map(item=>item.path));
for (const file of currentPaths) if (!baselinePaths.has(file)) failures.push(`${file} is not recorded in the protected baseline.`);
for (const file of baselinePaths) if (!currentPaths.has(file)) failures.push(`${file} is recorded in the protected baseline but is no longer tracked.`);
if (failures.length){failures.forEach(x=>console.error(`ERROR: ${x}`));process.exitCode=1}
else console.log(`Protected product integrity: passed (${checked} files)`);
