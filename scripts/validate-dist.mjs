import { access, readFile, readdir, stat } from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';
import process from 'node:process';

const root=path.resolve('dist');
const failures=[];
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
async function walk(directory,relative=''){
  for(const entry of await readdir(directory,{withFileTypes:true})){
    const rel=path.posix.join(relative,entry.name); const abs=path.join(directory,entry.name);
    if(entry.isDirectory()) await walk(abs,rel);
    else if(/\.(?:html|css|js|mjs)$/.test(entry.name)) await validateLocalReferences(rel);
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
  'index.html','privacy.html','style.css','main.js','robots.txt','sitemap.xml','assets/brand/baisalya-og.png',
  'assets/monetization/config.js','assets/monetization/monetization.js','assets/monetization/monetization.css',
  'src/site/main.js','devdesk/index.html','construction-erp/index.html','shoppilot-erp/index.html',
  'EduSheet/index.html','EduSheet/assets/css/styles.css','surveycam/index.html','surveycam/privacy.html',
  'surveycam/support.html','surveycam/assets/surveycam-logo.png','notivault-website/index.html',
  'notivault-website/privacy-policy/index.html','notivault-website/public/og-deleted-message.png',
  'server/index.js','release-manifest.json',
]) await exists(required);

await walk(root);
await validateReleaseManifest();

const index=await readFile(path.join(root,'index.html'),'utf8');
for(const expected of ['https://baisalya.com/','href="EduSheet/index.html"','href="surveycam/index.html"','href="notivault-website/"']){
  if(!index.includes(expected)) failures.push(`Production root identity missing: ${expected}`);
}
const monetizationConfig=await readFile(path.join(root,'assets/monetization/config.js'),'utf8');
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
