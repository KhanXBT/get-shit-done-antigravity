#!/usr/bin/env node

/**
 * GSD Tools for Antigravity
 * 
 * State management and utility functions for GSD workflows.
 * Used by workflow files to manage .planning/ directory state.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// ─── Constants ──────────────────────────────────
const PLANNING_DIR = '.planning';
const STATE_FILE = 'STATE.md';
const ROADMAP_FILE = 'ROADMAP.md';
const REQUIREMENTS_FILE = 'REQUIREMENTS.md';
const PROJECT_FILE = 'PROJECT.md';
const CONFIG_FILE = 'config.json';

// ─── Colors ─────────────────────────────────────
const colors = {
    orange: (s) => `\x1b[38;5;208m${s}\x1b[0m`,
    yellow: (s) => `\x1b[38;5;220m${s}\x1b[0m`,
    green: (s) => `\x1b[38;5;82m${s}\x1b[0m`,
    blue: (s) => `\x1b[38;5;33m${s}\x1b[0m`,
    cyan: (s) => `\x1b[38;5;51m${s}\x1b[0m`,
    red: (s) => `\x1b[31m${s}\x1b[0m`,
    bold: (s) => `\x1b[1m${s}\x1b[0m`,
    dim: (s) => `\x1b[2m${s}\x1b[0m`,
};

// ─── Planning Directory ─────────────────────────

/**
 * Find the .planning directory, searching up from cwd
 */
function findPlanningDir(startDir = process.cwd()) {
    let dir = startDir;
    while (dir !== path.dirname(dir)) {
        const planningPath = path.join(dir, PLANNING_DIR);
        if (fs.existsSync(planningPath)) {
            return planningPath;
        }
        dir = path.dirname(dir);
    }
    return null;
}

/**
 * Initialize .planning directory structure
 */
function initPlanningDir(baseDir = process.cwd()) {
    const planningPath = path.join(baseDir, PLANNING_DIR);
    const dirs = [
        planningPath,
        path.join(planningPath, 'research'),
        path.join(planningPath, 'phases'),
        path.join(planningPath, 'quick'),
    ];

    for (const dir of dirs) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }

    return planningPath;
}

// ─── State Management ───────────────────────────

/**
 * Read and parse STATE.md
 */
function readState(planningDir) {
    const statePath = path.join(planningDir, STATE_FILE);
    if (!fs.existsSync(statePath)) return null;

    const content = fs.readFileSync(statePath, 'utf8');
    return {
        raw: content,
        currentPhase: extractField(content, 'Phase'),
        status: extractField(content, 'Status'),
        lastActivity: extractField(content, 'Last activity'),
    };
}

/**
 * Read and parse ROADMAP.md
 */
function readRoadmap(planningDir) {
    const roadmapPath = path.join(planningDir, ROADMAP_FILE);
    if (!fs.existsSync(roadmapPath)) return null;

    const content = fs.readFileSync(roadmapPath, 'utf8');
    return {
        raw: content,
        phases: extractPhases(content),
    };
}

/**
 * Read config.json
 */
function readConfig(planningDir) {
    const configPath = path.join(planningDir, CONFIG_FILE);
    if (!fs.existsSync(configPath)) {
        return {
            depth: 'standard',
            commit_docs: true,
            workflow: { research: true, verification: true },
        };
    }

    try {
        return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch {
        return {
            depth: 'standard',
            commit_docs: true,
            workflow: { research: true, verification: true },
        };
    }
}

/**
 * Update STATE.md with new activity
 */
function updateState(planningDir, updates) {
    const statePath = path.join(planningDir, STATE_FILE);
    let content = fs.existsSync(statePath)
        ? fs.readFileSync(statePath, 'utf8')
        : '';

    if (updates.lastActivity) {
        content = content.replace(
            /\*\*Last activity:\*\*.*/,
            `**Last activity:** ${updates.lastActivity}`
        );
    }

    if (updates.phase) {
        content = content.replace(
            /\*\*Phase:\*\*.*/,
            `**Phase:** ${updates.phase}`
        );
    }

    if (updates.status) {
        content = content.replace(
            /\*\*Status:\*\*.*/,
            `**Status:** ${updates.status}`
        );
    }

    // Update timestamp
    const now = new Date().toISOString().split('T')[0];
    content = content.replace(
        /\*Last updated:.*/,
        `*Last updated: ${now}*`
    );

    fs.writeFileSync(statePath, content, 'utf8');
}

// ─── Phase Management ───────────────────────────

/**
 * Get phase directory path
 */
function getPhaseDir(planningDir, phaseNum) {
    const phasesDir = path.join(planningDir, 'phases');
    if (!fs.existsSync(phasesDir)) return null;

    const dirs = fs.readdirSync(phasesDir);
    const prefix = String(phaseNum).padStart(2, '0');
    const phaseDir = dirs.find(d => d.startsWith(prefix + '-'));

    return phaseDir ? path.join(phasesDir, phaseDir) : null;
}

/**
 * Create phase directory
 */
function createPhaseDir(planningDir, phaseNum, phaseName) {
    const prefix = String(phaseNum).padStart(2, '0');
    const slug = phaseName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .substring(0, 40);

    const phaseDir = path.join(planningDir, 'phases', `${prefix}-${slug}`);
    if (!fs.existsSync(phaseDir)) {
        fs.mkdirSync(phaseDir, { recursive: true });
    }

    return phaseDir;
}

/**
 * List all plan files for a phase
 */
function getPhasePlans(phaseDir) {
    if (!fs.existsSync(phaseDir)) return [];

    const files = fs.readdirSync(phaseDir);
    return files
        .filter(f => f.match(/^\d{2}-\d{2}-PLAN\.md$/))
        .sort()
        .map(f => ({
            file: f,
            path: path.join(phaseDir, f),
            content: fs.readFileSync(path.join(phaseDir, f), 'utf8'),
        }));
}

/**
 * List all summary files for a phase
 */
function getPhaseSummaries(phaseDir) {
    if (!fs.existsSync(phaseDir)) return [];

    const files = fs.readdirSync(phaseDir);
    return files
        .filter(f => f.match(/^\d{2}-\d{2}-SUMMARY\.md$/))
        .sort()
        .map(f => ({
            file: f,
            path: path.join(phaseDir, f),
            content: fs.readFileSync(path.join(phaseDir, f), 'utf8'),
        }));
}

// ─── Quick Tasks ────────────────────────────────

/**
 * Get next quick task number
 */
function getNextQuickTaskNum(planningDir) {
    const quickDir = path.join(planningDir, 'quick');
    if (!fs.existsSync(quickDir)) return 1;

    const dirs = fs.readdirSync(quickDir)
        .filter(d => fs.statSync(path.join(quickDir, d)).isDirectory())
        .sort();

    if (dirs.length === 0) return 1;

    const lastNum = parseInt(dirs[dirs.length - 1].split('-')[0], 10);
    return (lastNum || 0) + 1;
}

// ─── Utility Functions ──────────────────────────

/**
 * Extract a field value from markdown content
 */
function extractField(content, fieldName) {
    const regex = new RegExp(`\\*\\*${fieldName}:\\*\\*\\s*(.+)`, 'i');
    const match = content.match(regex);
    return match ? match[1].trim() : null;
}

/**
 * Extract phases from ROADMAP.md
 */
function extractPhases(content) {
    const phases = [];
    const phaseRegex = /####\s+Phase\s+(\d+):\s+(.+)/g;
    let match;

    while ((match = phaseRegex.exec(content)) !== null) {
        phases.push({
            number: parseInt(match[1], 10),
            name: match[2].trim(),
        });
    }

    return phases;
}

/**
 * Get current date string YYYY-MM-DD
 */
function getDateString() {
    return new Date().toISOString().split('T')[0];
}

/**
 * Get current datetime string
 */
function getDateTimeString() {
    return new Date().toISOString().replace('T', ' ').split('.')[0];
}

/**
 * Format file size for display
 */
function formatSize(bytes) {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

// ─── UI Components ──────────────────────────────

/**
 * Display a header banner
 */
function showHeader(title) {
    console.log(colors.orange('     ██████╗ ') + colors.orange('███████╗') + colors.yellow('██████╗ '));
    console.log(colors.yellow('    ██╔════╝ ') + colors.yellow('██╔════╝') + colors.green('██╔══██╗'));
    console.log(colors.green('    ██║  ███╗') + colors.green('███████╗') + colors.blue('██║  ██║'));
    console.log(colors.blue('    ██║   ██║') + colors.blue('╚════██║') + colors.blue('██║  ██║'));
    console.log(colors.blue('    ╚██████╔╝') + colors.cyan('███████║') + colors.cyan('██████╔╝'));
    console.log(colors.green('     ╚═════╝ ') + colors.blue('╚══════╝') + colors.cyan('╚═════╝ '));
    console.log(colors.dim('    Built by Arshad Khan'));
    console.log('');
    const line = '━'.repeat(53);
    console.log(` ${line}`);
    console.log(` GSD ► ${title}`);
    console.log(` ${line}`);
    console.log('');
}

/**
 * Display completion message
 */
function showComplete(title, details = []) {
    const line = '━'.repeat(53);
    console.log('');
    console.log(` ${line}`);
    console.log(` GSD ► ${title} ${colors.green('✓')}`);
    console.log(` ${line}`);
    for (const detail of details) {
        console.log(` ${detail}`);
    }
    console.log('');
}

// ─── CLI ────────────────────────────────────────

function showHelp() {
    showHeader('COMMAND REFERENCE');
    console.log(colors.bold('  GSD Tools — State management utilities'));
    console.log('');
    console.log('  Commands:');
    console.log('    status       Show current project status');
    console.log('    validate     Check .planning/ directory integrity');
    console.log('    init         Initialize .planning/ directory');
    console.log('    version      Show version');
    console.log('    help         Show this help');
    console.log('');
}

function showStatus() {
    const planningDir = findPlanningDir();
    if (!planningDir) {
        console.log(colors.yellow('  No GSD project found. Run /gsd-new-project to initialize.'));
        return;
    }

    const state = readState(planningDir);
    const roadmap = readRoadmap(planningDir);
    const config = readConfig(planningDir);

    showHeader('PROJECT STATUS');

    if (state) {
        console.log(`  Phase:     ${state.currentPhase || 'Unknown'}`);
        console.log(`  Status:    ${state.status || 'Unknown'}`);
        console.log(`  Activity:  ${state.lastActivity || 'Unknown'}`);
    }

    if (roadmap && roadmap.phases.length > 0) {
        console.log('');
        console.log(`  Phases: ${roadmap.phases.length} total`);
        for (const phase of roadmap.phases) {
            console.log(`    ${phase.number}. ${phase.name}`);
        }
    }

    console.log('');
    console.log(`  Depth:    ${config.depth}`);
    console.log(`  Research: ${config.workflow?.research ? 'enabled' : 'disabled'}`);
    console.log(`  Verify:   ${config.workflow?.verification ? 'enabled' : 'disabled'}`);
    console.log('');
}

function validate() {
    const planningDir = findPlanningDir();
    if (!planningDir) {
        console.log(colors.red('  ✗ No .planning/ directory found'));
        process.exit(1);
    }

    const checks = [
        [PROJECT_FILE, 'Project definition'],
        [REQUIREMENTS_FILE, 'Requirements'],
        [ROADMAP_FILE, 'Roadmap'],
        [STATE_FILE, 'Project state'],
        [CONFIG_FILE, 'Configuration'],
    ];

    let passed = 0;
    let failed = 0;

    showHeader('HEALTH CHECK');

    for (const [file, label] of checks) {
        const filePath = path.join(planningDir, file);
        if (fs.existsSync(filePath)) {
            const size = formatSize(fs.statSync(filePath).size);
            console.log(`  ${colors.green('✓')} ${label} ${colors.dim(`(${size})`)}`);
            passed++;
        } else {
            console.log(`  ${colors.red('✗')} ${label} — missing`);
            failed++;
        }
    }

    console.log('');
    console.log(`  ${passed} passed, ${failed} missing`);
    console.log('');

    if (failed > 0) {
        console.log(`  Run ${colors.cyan('/gsd-new-project')} to initialize missing files.`);
        console.log('');
    }
}

// ─── Main ───────────────────────────────────────
const command = process.argv[2];

switch (command) {
    case 'status':
        showStatus();
        break;
    case 'validate':
    case 'health':
        validate();
        break;
    case 'init':
        initPlanningDir();
        console.log(colors.green('  ✓ .planning/ directory initialized'));
        break;
    case 'version':
        console.log(getVersion());
        break;
    case 'help':
    case '--help':
    case '-h':
        showHelp();
        break;
    default:
        showHelp();
}

// ─── Exports (for use as module) ────────────────
module.exports = {
    findPlanningDir,
    initPlanningDir,
    readState,
    readRoadmap,
    readConfig,
    updateState,
    getPhaseDir,
    createPhaseDir,
    getPhasePlans,
    getPhaseSummaries,
    getNextQuickTaskNum,
    getDateString,
    getDateTimeString,
    showHeader,
    showComplete,
    colors,
};
