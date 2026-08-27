import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html;
const failures = [];

function requireText(expected, label = expected) {
  if (!html.includes(expected)) failures.push(`Professional home missing ${label}`);
}

function rejectBodyText(unexpected, label = unexpected) {
  if (body.toLowerCase().includes(unexpected.toLowerCase())) {
    failures.push(`Professional home must not contain ${label}`);
  }
}

function asArray(value) {
  return Array.isArray(value) ? value : value == null ? [] : [value];
}

const schemaNodes = [];
for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
  try {
    const parsed = JSON.parse(match[1]);
    if (Array.isArray(parsed?.['@graph'])) schemaNodes.push(...parsed['@graph']);
    else if (Array.isArray(parsed)) schemaNodes.push(...parsed);
    else if (parsed && typeof parsed === 'object') schemaNodes.push(parsed);
  } catch (error) {
    failures.push(`Professional home has invalid JSON-LD: ${error.message}`);
  }
}

const person = schemaNodes.find((node) => asArray(node?.['@type']).includes('Person') && node?.name === 'Baishalya Roul');
if (!person || !asArray(person.alternateName).includes('Baisalya')) {
  failures.push('Professional home missing Baisalya person alias');
}

const siteSnap = schemaNodes.find((node) =>
  ['SoftwareSourceCode', 'SoftwareApplication'].some((type) => asArray(node?.['@type']).includes(type)) &&
  node?.name === 'SiteSnap');
if (!siteSnap) failures.push('Professional home missing SiteSnap product identity');

for (const [expected, label] of [
  ['<title>Baishalya Roul (Baisalya) — DevDesk, SurveyCam & Software Builder</title>', 'professional SEO title'],
  ['id="software"', 'software section'],
  ['id="engineering"', 'engineering section'],
  ['href="/devdesk/"', 'DevDesk canonical route'],
  ['href="/shoppilot-erp/"', 'ShopPilot canonical route'],
  ['href="/construction-erp/"', 'Construction ERP canonical route'],
  ['href="/notivault-website/"', 'NotiVault canonical route'],
  ['href="/EduSheet/"', 'EduSheet canonical route'],
  ['href="/surveycam/"', 'SurveyCam canonical route'],
  ['href="/sitesnap/"', 'SiteSnap canonical route'],
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
  ['portfolio', 'legacy visible portfolio identity'],
]) rejectBodyText(unexpected, label);

if (failures.length) {
  for (const failure of failures) console.error(`ERROR: ${failure}`);
  process.exitCode = 1;
} else {
  console.log('Professional home information architecture and SEO schema: passed');
}
