import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const failures = [];

function requireText(expected, label = expected) {
  if (!html.includes(expected)) failures.push(`Professional home missing ${label}`);
}

function rejectText(unexpected, label = unexpected) {
  if (html.toLowerCase().includes(unexpected.toLowerCase())) {
    failures.push(`Professional home must not contain ${label}`);
  }
}

for (const [expected, label] of [
  ['<title>Baishalya Roul — Software Builder</title>', 'professional title'],
  ['id="software"', 'software section'],
  ['id="engineering"', 'engineering section'],
  ['devdesk/index.html', 'DevDesk route'],
  ['shoppilot-erp/index.html', 'ShopPilot route'],
  ['construction-erp/index.html', 'Construction ERP route'],
  ['notivault-website/', 'NotiVault route'],
  ['EduSheet/index.html', 'EduSheet route'],
  ['surveycam/index.html', 'SurveyCam website route'],
  ['com.baishalya.surveycam', 'SurveyCam Play listing'],
  ['Independent software builder', 'professional hero positioning'],
]) requireText(expected, label);

for (const [unexpected, label] of [
  ['Featured Projects', 'old projects heading'],
  ['Skills & Technologies', 'old skill-bar heading'],
  ['View My Work', 'old portfolio CTA'],
  ['E-Commerce Mobile App', 'placeholder e-commerce project'],
  ['AI Chatbot App', 'placeholder chatbot project'],
  ['Farmer Assistance App', 'placeholder farmer project'],
  ['href="#"', 'placeholder links'],
  ['portfolio', 'portfolio identity'],
]) rejectText(unexpected, label);

if (failures.length) {
  for (const failure of failures) console.error(`ERROR: ${failure}`);
  process.exitCode = 1;
} else {
  console.log('Professional home information architecture: passed');
}
