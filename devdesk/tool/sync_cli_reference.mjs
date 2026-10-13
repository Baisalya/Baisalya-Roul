import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Only inspect help. This utility never runs the documented operations.
const help = execFileSync('devdesk', ['--help'], { encoding: 'utf8' }).replaceAll('\r\n', '\n').trimEnd() + '\n';
const apiHelp = execFileSync('devdesk', ['api', 'run', '--help'], { encoding: 'utf8' }).replaceAll('\r\n', '\n');
const contentPath = fileURLToPath(new URL('../content/devdesk-cli.md', import.meta.url));
const snapshotPath = fileURLToPath(new URL('../assets/downloads/devdesk-cli-help.txt', import.meta.url));
const source = readFileSync(contentPath, 'utf8');
const usage = help.split('Usage:\n')[1]?.split('\nGlobal options')[0];
if (!usage) throw new Error('The installed CLI help format has changed; review it before syncing.');
const lines = usage.trim().split('\n').map(line => line.trim());
const families = [
  ['Files, projects, Git, and verification', ['files', 'project', 'git', 'verify', 'run']],
  ['Markdown, knowledge, search, and diff', ['markdown', 'knowledge', 'search', 'diff']],
  ['API requests, OpenAPI, and utilities', ['api', 'openapi', 'tools']],
  ['Workspace manifests and local data', ['workspace', 'snippets', 'notes', 'settings', 'backup']],
  ['Docker, Kubernetes, and ADB', ['containers', 'adb']],
  ['AI, saved agents, automation, and routines', ['ai', 'agents', 'routines']],
  ['Health, completion, diagnostics, and exit codes', ['doctor', 'completion', 'diagnostics', 'exit-codes']],
];
const grouped = families.map(([title, names]) => {
  const commands = lines.filter(line => names.includes(line.split(' ')[1]));
  return `### ${title}\n\n\`\`\`text\n${commands.join('\n')}\n\`\`\``;
});
const covered = families.flatMap(([, names]) => names);
if (lines.some(line => !covered.includes(line.split(' ')[1]))) {
  throw new Error('An unrecognized command family needs a reference section.');
}
const apiOptions = apiHelp.split('Options:\n')[1]?.split('\nSecret environment variables')[0]?.trimEnd();
if (!apiOptions) throw new Error('API collection help format has changed.');
const start = '<!-- CLI_REFERENCE_START -->';
const end = '<!-- CLI_REFERENCE_END -->';
const reference = `${start}
## Complete command reference

Every usage line below comes from the installed \`devdesk --help\`. Square
brackets mark optional arguments; angle brackets mark values you must replace.
The \`...\` entries are exactly as summarized by the CLI, not expanded syntax.
Download the [plain-text help snapshot](../assets/downloads/devdesk-cli-help.txt)
or run \`devdesk --help\` locally to check your installed build.

${grouped.join('\n\n')}

### Global, run, and HTTP request options

\`\`\`text
${help.split('Global options')[1].split('\nExamples:')[0].replace(/^ \(place before the command\):\n/, 'Global options (place before the command):\n').trimEnd()}
\`\`\`

### API collection runner options

\`devdesk api run <workspace.json>\` also accepts these options, checked with
\`devdesk api run --help\`:

\`\`\`text
${apiOptions}
\`\`\`

Secret environment variables use \`DEVDESK_SECRET_<VARIABLE_NAME>\`.
${end}`;

if (process.argv.includes('--check')) {
  const startIndex = source.indexOf(start);
  const endIndex = source.indexOf(end, startIndex);
  if (startIndex < 0 || endIndex < 0 || source.slice(startIndex, endIndex + end.length).replaceAll('\r\n', '\n') !== reference || readFileSync(snapshotPath, 'utf8').replaceAll('\r\n', '\n') !== help) {
    throw new Error('CLI reference differs from installed help; run this utility without --check and refresh the manual.');
  }
  console.log(`CLI reference matches installed help: ${lines.length} usage lines and API runner options.`);
} else {
  const startIndex = source.indexOf(start);
  const endIndex = source.indexOf(end, startIndex);
  if (startIndex >= 0 && endIndex < 0) throw new Error('Reference end marker missing.');
  const updated = startIndex < 0
    ? `${source.trimEnd()}\n\n${reference}\n`
    : source.slice(0, startIndex) + reference + source.slice(endIndex + end.length);
  writeFileSync(contentPath, updated, 'utf8');
  writeFileSync(snapshotPath, help, 'utf8');
  console.log(`Synced ${lines.length} CLI usage lines. Next: dart run tool/refresh_manual.dart devdesk-cli (from devdesk/).`);
}
