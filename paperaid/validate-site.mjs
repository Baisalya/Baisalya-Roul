import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd();
const failures=[];
const required=['index.html','download.html','quick-start.html','manual.html','privacy-policy.html','terms-of-service.html','support.html','404.html','site-config.js','config.json','update.json','site.webmanifest','robots.txt','sitemap.xml','assets/site.css','assets/site.js','assets/paperaid-mark.svg','assets/paperaid-app-icon.png','assets/paperaid-og.png'];
for(const f of required){try{await stat(path.join(root,f));}catch{failures.push(`Missing ${f}`)}}
for(const f of ['index.html','download.html','quick-start.html','manual.html','privacy-policy.html','terms-of-service.html','support.html']){
 const html=await readFile(path.join(root,f),'utf8');
 if(!html.includes('<link rel="canonical"')) failures.push(`${f}: canonical missing`);
 if(!html.includes('meta name="robots"')) failures.push(`${f}: robots meta missing`);
}
const home=await readFile(path.join(root,'index.html'),'utf8');
if((home.match(/data-ad-unit="manual"/g)||[]).length!==1) failures.push('Home must have exactly one manual ad slot');
for(const f of ['download.html','quick-start.html','manual.html','privacy-policy.html','terms-of-service.html','support.html']){
 const html=await readFile(path.join(root,f),'utf8');
 if((html.match(/data-ad-unit="manual"/g)||[]).length!==0) failures.push(`${f}: must remain ad-free`);
}
const config=JSON.parse(await readFile(path.join(root,'config.json'),'utf8'));
if(config?.monetization?.enabled!==false||config?.monetization?.rewardedAdsEnabled!==false) failures.push('config.json must default to free/no-ads');
const update=JSON.parse(await readFile(path.join(root,'update.json'),'utf8'));
if(!update.android||!update.windows) failures.push('update.json missing platform blocks');
if(failures.length){failures.forEach(x=>console.error('ERROR:',x));process.exit(1)}
console.log('PaperAid website package validation: passed');
