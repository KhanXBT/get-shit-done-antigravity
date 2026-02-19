#!/usr/bin/env node

/**
 * GSD for Antigravity — Installer
 * 
 * Usage:
 *   npx get-shit-done-antigravity           # Interactive install
 *   npx get-shit-done-antigravity --global   # Global install
 *   npx get-shit-done-antigravity --local    # Local install to current dir
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

// ─── Colors ─────────────────────────────────────
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const orange = (s) => `\x1b[38;5;208m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const blue = (s) => `\x1b[34m${s}\x1b[0m`;
const cyan = (s) => `\x1b[36m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;

// ─── Banner ─────────────────────────────────────
function showBanner() {
    process.stdout.write('\x1b[2J\x1b[0;0H'); // Clear screen
    console.log('');
    console.log(orange('     ██████╗ ') + yellow('███████╗') + green('██████╗ '));
    console.log(orange('    ██╔════╝ ') + yellow('██╔════╝') + green('██╔══██╗'));
    console.log(yellow('    ██║  ███╗') + green('███████╗') + blue('██║  ██║'));
    console.log(yellow('    ██║   ██║') + green('╚════██║') + blue('██║  ██║'));
    console.log(green('    ╚██████╔╝') + blue('███████║') + cyan('██████╔╝'));
    console.log(green('     ╚═════╝ ') + blue('╚══════╝') + cyan('╚═════╝ '));
    console.log('');
    console.log('    ' + bold('GSD for Antigravity') + ' ' + dim('v' + getVersion()));
    console.log('    ' + green('The first autonomous, multi-model development engine.'));
    console.log('    ' + dim('Built by Arshad Khan'));
    console.log('');
}

// ─── Version ────────────────────────────────────
function getVersion() {
    try {
        const pkg = require(path.join(__dirname, '..', 'package.json'));
        return pkg.version || '1.0.0';
    } catch {
        return '1.0.0';
    }
}

// ─── Paths ──────────────────────────────────────
function getRepoDir() {
    return path.resolve(__dirname, '..');
}

function getGlobalDir() {
    const home = os.homedir();
    if (process.platform === 'win32') {
        return path.join(home, '.gemini', 'antigravity', '.agent');
    }
    return path.join(home, '.gemini', 'antigravity', '.agent');
}

function getLocalDir() {
    return path.join(process.cwd(), '.agent');
}

// ─── Copy Directory Contents ────────────────────
function copyDir(src, dest, ext = '.md') {
    if (!fs.existsSync(src)) return 0;
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    let count = 0;
    const files = fs.readdirSync(src);
    for (const file of files) {
        if (ext && !file.endsWith(ext) && !file.endsWith('.json')) continue;
        const srcFile = path.join(src, file);
        const destFile = path.join(dest, file);
        if (fs.statSync(srcFile).isFile()) {
            fs.copyFileSync(srcFile, destFile);
            count++;
        }
    }
    return count;
}

// ─── Install ────────────────────────────────────
function install(targetDir) {
    const repoDir = getRepoDir();
    let totalFiles = 0;

    // Workflows
    process.stdout.write('  Installing workflows...');
    const wCount = copyDir(
        path.join(repoDir, 'workflows'),
        path.join(targetDir, 'workflows')
    );
    totalFiles += wCount;
    console.log(` ${green('✓')} ${dim(`(${wCount} files)`)}`);

    // Agents
    const agentsSrc = path.join(repoDir, 'agents');
    if (fs.existsSync(agentsSrc)) {
        process.stdout.write('  Installing agents...');
        const aCount = copyDir(agentsSrc, path.join(targetDir, 'agents'));
        totalFiles += aCount;
        console.log(` ${green('✓')} ${dim(`(${aCount} files)`)}`);
    }

    // Templates
    const templatesSrc = path.join(repoDir, 'templates');
    if (fs.existsSync(templatesSrc)) {
        process.stdout.write('  Installing templates...');
        const tCount = copyDir(templatesSrc, path.join(targetDir, 'templates'));
        totalFiles += tCount;
        console.log(` ${green('✓')} ${dim(`(${tCount} files)`)}`);
    }

    // References
    const referencesSrc = path.join(repoDir, 'references');
    if (fs.existsSync(referencesSrc)) {
        process.stdout.write('  Installing references...');
        const rCount = copyDir(referencesSrc, path.join(targetDir, 'references'));
        totalFiles += rCount;
        console.log(` ${green('✓')} ${dim(`(${rCount} files)`)}`);
    }

    // Write VERSION
    const versionFile = path.join(targetDir, 'VERSION');
    fs.writeFileSync(versionFile, getVersion() + '\n');

    console.log('');
    console.log(`  ${green('✓')} Installation complete! ${dim(`(${totalFiles} files)`)}`);
    console.log('');
    console.log(`  ${bold('Start with:')} /gsd-help`);
    console.log('');
}

// ─── Interactive Prompt ─────────────────────────
function prompt(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

// ─── Main ───────────────────────────────────────
async function main() {
    showBanner();

    const args = process.argv.slice(2);

    // Help
    if (args.includes('--help') || args.includes('-h')) {
        console.log('  Usage: npx get-shit-done-antigravity [options]');
        console.log('');
        console.log('  Options:');
        console.log('    --global, -g    Install to ~/.gemini/antigravity/.agent/');
        console.log('    --local, -l     Install to ./.agent/ in current directory');
        console.log('    --help, -h      Show this help message');
        console.log('');
        process.exit(0);
    }

    // Non-interactive
    if (args.includes('--global') || args.includes('-g')) {
        const dir = getGlobalDir();
        console.log(`  Installing ${yellow('globally')} to ${cyan(dir)}`);
        console.log('');
        install(dir);
        return;
    }

    if (args.includes('--local') || args.includes('-l')) {
        const dir = getLocalDir();
        console.log(`  Installing ${yellow('locally')} to ${cyan(dir)}`);
        console.log('');
        install(dir);
        return;
    }

    // Check if TTY (interactive terminal)
    if (!process.stdin.isTTY) {
        console.log(yellow('  Non-interactive terminal detected, defaulting to global install'));
        console.log('');
        const dir = getGlobalDir();
        console.log(`  Installing to ${cyan(dir)}`);
        console.log('');
        install(dir);
        return;
    }

    // Interactive
    console.log('  Where should GSD be installed?');
    console.log('');
    console.log(`  ${bold('1.')} Global ${dim('(~/.gemini/antigravity/.agent/) — all projects')}`);
    console.log(`  ${bold('2.')} Local  ${dim('(./.agent/ — current project only)')}`);
    console.log('');

    const answer = await prompt('  Choice (1/2): ');
    console.log('');

    if (answer === '2') {
        const dir = getLocalDir();
        console.log(`  Installing ${yellow('locally')} to ${cyan(dir)}`);
        console.log('');
        install(dir);
    } else {
        const dir = getGlobalDir();
        console.log(`  Installing ${yellow('globally')} to ${cyan(dir)}`);
        console.log('');
        install(dir);
    }
}

main().catch(console.error);
