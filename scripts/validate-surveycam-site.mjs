import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
const root=process.cwd(); const failures=[];
async function exists(p){try{await access(path.join(root,p));return true}catch{failures.push(`SurveyCam missing file: ${p}`);return false}}
for(const p of ['surveycam/index.html','surveycam/privacy.html','surveycam/support.html','surveycam/styles.css','surveycam/site.js','surveycam/robots.txt','surveycam/sitemap.xml','surveycam/assets/surveycam-logo.png','surveycam/assets/surveycam-og.png']) await exists(p);
const home=await readFile(path.join(root,'surveycam/index.html'),'utf8');
for(const x of ['SurveyCam - Location & Geo Tag','https://play.google.com/store/apps/details?id=com.baishalya.surveycam&pcampaignid=web_share','PDF proof reports','Project-wise folders','No data collection declared','baishalya1999@gmail.com']) if(!home.includes(x)) failures.push(`SurveyCam home missing: ${x}`);
const rootHome=await readFile(path.join(root,'index.html'),'utf8'); if(!rootHome.includes('href="surveycam/index.html"')) failures.push('Root software card missing SurveyCam website link');
const privacy=await readFile(path.join(root,'surveycam/privacy.html'),'utf8'); for(const x of ['does not share data with third parties','does not collect data','baishalya1999@gmail.com']) if(!privacy.includes(x)) failures.push(`SurveyCam privacy missing: ${x}`);
if(failures.length){failures.forEach(x=>console.error(`ERROR: ${x}`));process.exitCode=1} else console.log('SurveyCam website and root integration: passed');
