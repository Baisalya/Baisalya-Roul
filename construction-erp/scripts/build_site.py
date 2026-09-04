#!/usr/bin/env python3
from __future__ import annotations
import argparse, json, re, shutil, sys
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'src'
DIST = ROOT / 'dist'
CONFIG_PATH = ROOT / 'site.config.json'
PLACEHOLDER_MARKERS = ('REPLACE WITH', 'REPLACE_', 'REPLACE-WITH', 'your-domain', 'example.com')

def fail(msg: str) -> None:
    print(f'ERROR: {msg}', file=sys.stderr); raise SystemExit(1)

def validate(cfg: dict, allow: bool) -> None:
    required = ['appName','publisherName','supportEmail','siteUrl','appVersion','lastUpdated']
    for key in required:
        value = str(cfg.get(key,'')).strip()
        if not value: fail(f'Missing required setting: {key}')
        if not allow and any(m.lower() in value.lower() for m in PLACEHOLDER_MARKERS): fail(f'{key} still contains a placeholder: {value}')
    email = str(cfg['supportEmail']).strip()
    if not allow and not re.fullmatch(r'[^@\s]+@[^@\s]+\.[^@\s]+', email): fail('supportEmail is not a valid public email address.')
    url = str(cfg['siteUrl']).strip().rstrip('/')
    parsed = urlparse(url)
    if not allow and (parsed.scheme != 'https' or not parsed.netloc): fail('siteUrl must be a public HTTPS URL.')
    cfg['siteUrl'] = url
    for key in ('windows','android'):
        p = cfg.get('platforms',{}).get(key,{})
        if p.get('enabled') and not (p.get('storeUrl') or p.get('directUrl')): fail(f'{key} is enabled but has no storeUrl or directUrl.')
        for link_key in ('storeUrl','directUrl'):
            link = str(p.get(link_key,'')).strip()
            if link and urlparse(link).scheme not in ('https',): fail(f'{key}.{link_key} must use HTTPS.')

def replacements(cfg: dict) -> dict[str,str]:
    site = cfg['siteUrl'].rstrip('/')
    return {
      '{{APP_NAME}}': str(cfg['appName']), '{{PUBLISHER_NAME}}': str(cfg['publisherName']),
      '{{SUPPORT_EMAIL}}': str(cfg['supportEmail']), '{{SITE_URL}}': site,
      '{{APP_VERSION}}': str(cfg['appVersion']), '{{LAST_UPDATED}}': str(cfg['lastUpdated'])
    }

def mirror_deploy_root() -> None:
    """Keep the archive-root preview in sync with the built site.

    src/ remains the source of truth and dist/ remains the deployment output.
    The root mirror exists only so opening index.html from the unpacked archive
    cannot accidentally show an older website.
    """
    for path in DIST.iterdir():
        if path.name == 'assets':
            shutil.copytree(path, ROOT / 'assets', dirs_exist_ok=True)
            continue
        if path.is_file() and (
            path.suffix.lower() in {'.html', '.xml', '.txt', '.webmanifest'}
            or path.name in {'.nojekyll', '_headers'}
        ):
            shutil.copy2(path, ROOT / path.name)

def main() -> None:
    ap=argparse.ArgumentParser(description='Build the static Construction ERP website.')
    ap.add_argument('--allow-placeholders', action='store_true', help='Generate a local preview even when production identity/contact settings are not final.')
    args=ap.parse_args()
    if not CONFIG_PATH.exists(): fail('site.config.json was not found.')
    cfg=json.loads(CONFIG_PATH.read_text(encoding='utf-8'))
    validate(cfg,args.allow_placeholders)
    if DIST.exists(): shutil.rmtree(DIST)
    shutil.copytree(SRC,DIST)
    reps=replacements(cfg)
    text_ext={'.html','.css','.js','.json','.webmanifest','.xml','.txt','.md','.svg'}
    for p in DIST.rglob('*'):
        if not p.is_file() or (p.suffix.lower() not in text_ext and p.name not in {'.nojekyll','_headers'}): continue
        try: text=p.read_text(encoding='utf-8')
        except UnicodeDecodeError: continue
        for old,new in reps.items(): text=text.replace(old,new)
        p.write_text(text,encoding='utf-8')
    runtime = 'window.CONSTRUCTION_ERP_CONFIG = ' + json.dumps({
      'appName':cfg['appName'],'appVersion':cfg['appVersion'],'salesModel':cfg.get('salesModel',''),'supportEmail':cfg['supportEmail'],
      'securityEmail':cfg.get('securityEmail') or cfg['supportEmail'],'siteUrl':cfg['siteUrl'],
      'githubRepositoryUrl':cfg.get('githubRepositoryUrl',''),'platforms':cfg.get('platforms',{})
    }, ensure_ascii=False, indent=2) + ';\n'
    (DIST/'assets/js/runtime-config.js').write_text(runtime,encoding='utf-8')
    unresolved=[]
    for p in DIST.rglob('*'):
        if p.is_file() and p.suffix.lower() in text_ext:
            try: text=p.read_text(encoding='utf-8')
            except UnicodeDecodeError: continue
            if re.search(r'\{\{[A-Z0-9_]+\}\}',text): unresolved.append(str(p.relative_to(DIST)))
    if unresolved: fail('Unresolved template tokens: '+', '.join(unresolved))
    mirror_deploy_root()
    print(f'Built {DIST}')
    print(f'App: {cfg["appName"]} {cfg["appVersion"]}')
    print(f'Site: {cfg["siteUrl"]}')
    print('Production validation:', 'BYPASSED FOR PREVIEW' if args.allow_placeholders else 'PASSED')
if __name__=='__main__': main()
