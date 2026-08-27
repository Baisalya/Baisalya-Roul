import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();

async function read(relativePath) {
  return readFile(path.join(root, relativePath), 'utf8');
}

async function write(relativePath, content) {
  await writeFile(path.join(root, relativePath), content, 'utf8');
  console.log(`WRITE ${relativePath}`);
}

function replaceOnce(source, searchValue, replacement, label) {
  if (typeof searchValue === 'string') {
    const count = source.split(searchValue).length - 1;
    if (count !== 1) {
      throw new Error(`${label}: expected exactly one match, found ${count}`);
    }
    return source.replace(searchValue, replacement);
  }

  const matches = source.match(new RegExp(searchValue.source, searchValue.flags.includes('g') ? searchValue.flags : `${searchValue.flags}g`));
  const count = matches?.length ?? 0;
  if (count !== 1) {
    throw new Error(`${label}: expected exactly one match, found ${count}`);
  }
  return source.replace(searchValue, replacement);
}

// -----------------------------------------------------------------------------
// 1) Professional homepage hero: smaller, cleaner, better balanced.
// -----------------------------------------------------------------------------
{
  const file = 'index.html';
  let html = await read(file);

  if (!html.includes('class="professional-hero__tagline"')) {
    const heroPattern = /<h1 id="hero-title">Baishalya Roul \(Baisalya\) — building software that stays useful after the demo\.<\/h1>\s*<p class="professional-hero__lede">[\s\S]*?<\/p>/;

    const heroReplacement = `<h1 id="hero-title" class="professional-hero__title">
                        <span class="professional-hero__name">Baishalya Roul</span>
                        <span class="professional-hero__alias">(Baisalya)</span>
                    </h1>
                    <p class="professional-hero__tagline">
                        Building practical software for developers, businesses, field teams, Android users, and educators.
                    </p>
                    <p class="professional-hero__lede">
                        Android, Windows and web products with local-first workflows, clear product experiences, and dependable release engineering.
                    </p>`;

    html = replaceOnce(html, heroPattern, heroReplacement, 'homepage hero content');
    await write(file, html);
  } else {
    console.log('SKIP index.html (hero fix already applied)');
  }
}

// -----------------------------------------------------------------------------
// 2) Hero CSS: reduce desktop scale and improve responsive balance.
// -----------------------------------------------------------------------------
{
  const file = 'src/site/styles/components/hero.css';
  let css = await read(file);

  if (!css.includes('.professional-hero__tagline')) {
    css = replaceOnce(
      css,
      ".professional-hero { min-height: 760px; display: flex; align-items: center; padding: 148px 0 86px; position: relative; overflow: hidden; }",
      ".professional-hero { min-height: 690px; display: flex; align-items: center; padding: 132px 0 76px; position: relative; overflow: hidden; }",
      'hero shell'
    );

    css = replaceOnce(
      css,
      ".professional-hero__grid { display: grid; grid-template-columns: minmax(0,1.05fr) minmax(390px,.95fr); gap: clamp(3rem,7vw,7rem); align-items: center; position: relative; z-index: 1; }",
      ".professional-hero__grid { display: grid; grid-template-columns: minmax(0,1fr) minmax(360px,.9fr); gap: clamp(2.5rem,5vw,5.5rem); align-items: center; position: relative; z-index: 1; }",
      'hero grid'
    );

    css = replaceOnce(
      css,
      ".professional-hero h1 { max-width: 820px; margin: 1.35rem 0 1.5rem; font-size: clamp(3.25rem,6.4vw,6.15rem); line-height: .96; letter-spacing: -.064em; font-weight: 800; }",
      `.professional-hero h1 { max-width: 700px; margin: 1.2rem 0 .8rem; font-size: clamp(2.85rem,5vw,4.9rem); line-height: .96; letter-spacing: -.055em; font-weight: 800; }
.professional-hero__title { display: grid; gap: .08em; }
.professional-hero__name, .professional-hero__alias { display: block; }
.professional-hero__alias { font-size: .72em; color: var(--text-muted); letter-spacing: -.045em; }
.professional-hero__tagline { max-width: 700px; margin: 0 0 .9rem; color: var(--text); font-size: clamp(1.12rem,1.7vw,1.45rem); line-height: 1.45; letter-spacing: -.02em; font-weight: 650; }`,
      'hero title'
    );

    css = replaceOnce(
      css,
      ".professional-hero__lede { max-width: 720px; margin-bottom: 2rem; font-size: clamp(1rem,1.6vw,1.2rem); line-height: 1.75; }",
      ".professional-hero__lede { max-width: 680px; margin-bottom: 1.8rem; font-size: clamp(.98rem,1.2vw,1.08rem); line-height: 1.65; }",
      'hero lede'
    );

    css = replaceOnce(
      css,
      ".professional-hero__visual { position: relative; min-height: 460px; display: grid; place-items: center; }",
      ".professional-hero__visual { position: relative; min-height: 420px; display: grid; place-items: center; }",
      'hero visual'
    );

    css = replaceOnce(
      css,
      ".builder-window { position: relative; z-index: 2; width: min(100%,500px); overflow: hidden; border: 1px solid var(--border-strong); border-radius: 22px; background: color-mix(in srgb, var(--bg-elevated) 88%, transparent); box-shadow: var(--shadow-float); backdrop-filter: blur(22px); transform: rotate(1.4deg); }",
      ".builder-window { position: relative; z-index: 2; width: min(100%,480px); overflow: hidden; border: 1px solid var(--border-strong); border-radius: 22px; background: color-mix(in srgb, var(--bg-elevated) 88%, transparent); box-shadow: var(--shadow-float); backdrop-filter: blur(22px); transform: rotate(1.1deg); }",
      'builder window'
    );

    css = replaceOnce(
      css,
      "@media (max-width: 1040px) { .professional-hero__grid { grid-template-columns: 1fr; gap: 3rem; } .professional-hero__visual { min-height: 390px; } .builder-window { max-width: 620px; } }",
      "@media (max-width: 1040px) { .professional-hero__grid { grid-template-columns: 1fr; gap: 2.5rem; } .professional-hero h1 { max-width: 760px; } .professional-hero__visual { min-height: 360px; } .builder-window { max-width: 600px; } }",
      'tablet hero'
    );

    css = replaceOnce(
      css,
      "@media (max-width: 768px) { .professional-hero { min-height: auto; padding: 126px 0 70px; } .professional-hero h1 { font-size: clamp(3rem,15vw,5rem); } .professional-hero__visual { min-height: 330px; } .professional-hero__orbit--one { width: 290px; height: 290px; } .professional-hero__orbit--two { width: 360px; height: 360px; } }",
      "@media (max-width: 768px) { .professional-hero { min-height: auto; padding: 118px 0 64px; } .professional-hero h1 { max-width: 100%; font-size: clamp(2.55rem,11vw,4rem); } .professional-hero__alias { font-size: .76em; } .professional-hero__tagline { font-size: clamp(1.05rem,4.8vw,1.3rem); } .professional-hero__visual { min-height: 320px; } .professional-hero__orbit--one { width: 290px; height: 290px; } .professional-hero__orbit--two { width: 360px; height: 360px; } }",
      'mobile hero'
    );

    await write(file, css);
  } else {
    console.log(`SKIP ${file} (hero CSS fix already applied)`);
  }
}

// -----------------------------------------------------------------------------
// 3) AdSense deployment fix:
//    - repository source stays OFF (tests remain safe)
//    - production dist activates by default
//    - set ADSENSE_CONSENT_READY=false in GitHub Actions Variables to pause ads
// -----------------------------------------------------------------------------
{
  const file = '.github/workflows/deploy-baisalya-pages.yml';
  let yaml = await read(file);

  if (yaml.includes("vars.ADSENSE_CONSENT_READY == 'true'")) {
    yaml = replaceOnce(
      yaml,
      "      - name: Configure production AdSense after consent gate\n        if: ${{ vars.ADSENSE_CONSENT_READY == 'true' }}",
      "      - name: Configure production AdSense\n        # Production ads are ON by default. Set ADSENSE_CONSENT_READY=false to pause.\n        if: ${{ vars.ADSENSE_CONSENT_READY != 'false' }}",
      'AdSense workflow gate'
    );
    await write(file, yaml);
  } else if (yaml.includes("vars.ADSENSE_CONSENT_READY != 'false'")) {
    console.log(`SKIP ${file} (production AdSense default-on fix already applied)`);
  } else {
    throw new Error('AdSense workflow gate: expected known gate was not found');
  }
}

// -----------------------------------------------------------------------------
// 4) Keep the revenue validator aligned with the production contract.
// -----------------------------------------------------------------------------
{
  const file = 'scripts/validate-revenue-ready.mjs';
  let source = await read(file);

  if (source.includes("  'ADSENSE_CONSENT_READY',")) {
    source = replaceOnce(
      source,
      "  'ADSENSE_CONSENT_READY',",
      "  \"vars.ADSENSE_CONSENT_READY != 'false'\",",
      'revenue validator workflow contract'
    );
    await write(file, source);
  } else if (source.includes("vars.ADSENSE_CONSENT_READY != 'false'")) {
    console.log(`SKIP ${file} (validator already aligned)`);
  } else {
    throw new Error('Revenue validator: expected workflow requirement was not found');
  }
}

// -----------------------------------------------------------------------------
// 5) Update deployment/revenue documentation without touching product sources.
// -----------------------------------------------------------------------------
{
  const file = 'DEPLOYMENT_REVENUE_GUIDE.md';
  let guide = await read(file);

  const sectionPattern = /### Production activation[\s\S]*?(?=## Local production test)/;
  const newSection = `### Production activation
AdSense is enabled **after** the release build, only in \`dist/\`, so the repository-safe source config remains disabled and protected product baselines stay stable.

The production workflow now activates the approved AdSense client and responsive slot by default:

- Publisher/client: \`ca-pub-1529558529658186\`
- Responsive manual slot: \`9546051599\`

The workflow runs:

\`\`\`powershell
npm run release
npm run adsense:configure -- --root=dist --client=ca-pub-1529558529658186 --slot=9546051599 --consent-ready=true
npm run test:dist
\`\`\`

To temporarily stop production AdSense requests, create/set this GitHub Actions repository variable:

\`ADSENSE_CONSENT_READY=false\`

Path: **Repository Settings → Secrets and variables → Actions → Variables**.

Before leaving production ads enabled for visitors in regions where consent is required, keep a Google-certified consent/CMP solution configured (for example through AdSense Privacy & messaging). The main portfolio, NotiVault, legal/privacy/deletion pages and 404 pages remain intentionally ad-free.

`;

  if (guide.includes('If `ADSENSE_CONSENT_READY` is absent or not `true`')) {
    guide = replaceOnce(guide, sectionPattern, newSection, 'deployment guide production activation');
    await write(file, guide);
  } else if (guide.includes('production workflow now activates the approved AdSense client')) {
    console.log(`SKIP ${file} (guide already updated)`);
  } else {
    throw new Error('Deployment guide: expected previous activation section was not found');
  }
}

console.log('');
console.log('Hero + production AdSense hotfix applied.');
console.log('Source assets/monetization/config.js intentionally remains OFF.');
console.log('Production dist will activate ca-pub-1529558529658186 / slot 9546051599 by default.');
console.log('Set GitHub Actions variable ADSENSE_CONSENT_READY=false only when you need to pause ads.');
console.log('');
console.log('Next run:');
console.log('  npm run test:professional-home');
console.log('  npm run test:revenue-ready');
console.log('  npm run release');
