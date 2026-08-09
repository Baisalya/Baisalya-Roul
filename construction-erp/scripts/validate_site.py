#!/usr/bin/env python3
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import re, subprocess, sys

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'

class Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs=[]; self.ids=[]; self.title=False; self.desc=False; self.h1=0
        self.images=[]
    def handle_starttag(self,tag,attrs):
        d=dict(attrs)
        if tag=='title': self.title=True
        if tag=='meta' and d.get('name')=='description' and d.get('content'): self.desc=True
        if tag=='h1': self.h1+=1
        if d.get('id'): self.ids.append(d['id'])
        if tag=='img': self.images.append(d)
        for k in ('href','src'):
            if d.get(k): self.refs.append(d[k])

def parse_page(path: Path):
    parser=Parser(); parser.feed(path.read_text(encoding='utf-8')); return parser

problems=[]
pages={p.name: parse_page(p) for p in DIST.glob('*.html')}

for name,parser in pages.items():
    p=DIST/name
    if not parser.title: problems.append(f'{name}: missing title')
    if not parser.desc: problems.append(f'{name}: missing meta description')
    if parser.h1!=1: problems.append(f'{name}: expected 1 h1, found {parser.h1}')
    if len(parser.ids)!=len(set(parser.ids)): problems.append(f'{name}: duplicate HTML id')
    for image in parser.images:
        if 'alt' not in image: problems.append(f'{name}: image missing alt attribute: {image.get("src", "unknown")}')
    for ref in parser.refs:
        if ref.startswith(('mailto:','tel:','http://','https://','data:')): continue
        split=urlsplit(ref)
        if split.path:
            target=(p.parent/split.path).resolve()
            if not target.exists():
                problems.append(f'{name}: missing {ref}')
                continue
        else:
            target=p
        if split.fragment and target.suffix.lower()=='.html' and target.exists():
            target_parser=pages.get(target.name) or parse_page(target)
            if split.fragment not in set(target_parser.ids):
                problems.append(f'{name}: missing section target {ref}')

for js in (DIST/'assets/js').glob('*.js'):
    r=subprocess.run(['node','--check',str(js)],capture_output=True,text=True)
    if r.returncode: problems.append(f'{js.name}: {r.stderr.strip()}')

css=(DIST/'assets/css/styles.css')
if css.exists():
    text=css.read_text(encoding='utf-8')
    if text.count('{') != text.count('}'):
        problems.append('styles.css: unbalanced braces')

# Prevent accidental rollback to a known superseded website release in deploy output.
for p in DIST.rglob('*'):
    if p.is_file() and p.suffix.lower() in {'.html','.js','.css','.json','.xml','.txt','.webmanifest'}:
        try: text=p.read_text(encoding='utf-8')
        except UnicodeDecodeError: continue
        if re.search(r'1\.10\.6\+82|v1\.10\.6|1\.21\.3\+106', text):
            problems.append(f'{p.relative_to(DIST)}: contains a superseded app version')

og_image = DIST / 'assets' / 'images' / 'og.png'
if not og_image.exists() or og_image.stat().st_size < 100_000:
    problems.append('assets/images/og.png: missing or unexpectedly small social card')

# Keep the public product story aligned with the current app language and role navigation.
deprecated_copy = {
    'quoted/estimated values': 'use Contract Value',
    'agreement values': 'use Contract Value',
    '15 app modules': 'normal users now follow the seven-step operational flow',
    'Easy manual': 'use User guide',
}
for page in DIST.glob('*.html'):
    text = page.read_text(encoding='utf-8')
    for old, guidance in deprecated_copy.items():
        if old.lower() in text.lower():
            problems.append(f'{page.name}: contains deprecated copy "{old}"; {guidance}')

required_product_copy = {
    'index.html': ('Contract Value', 'Project Cost Budget', 'Request walkthrough'),
    'features.html': ('Tender', 'Daily Work', 'Stock', 'Labour', 'Machinery', 'Report'),
    'manual.html': ('Tender → Project → Daily Work → Stock → Labour → Machinery → Report', 'budget-approval'),
    'support.html': (
        'Product walkthrough',
        'action="https://formsubmit.co/baishalya@gmail.com"',
        'name="_honey"',
        'Send request',
    ),
}
for name, phrases in required_product_copy.items():
    text = (DIST / name).read_text(encoding='utf-8')
    for phrase in phrases:
        if phrase not in text:
            problems.append(f'{name}: missing required current-product copy "{phrase}"')

if problems:
    print('\n'.join('ERROR: '+x for x in problems)); sys.exit(1)
print(f'Website validation passed: {len(pages)} HTML pages, links/sections/assets present, IDs unique, image alts present, JavaScript syntax clean.')
