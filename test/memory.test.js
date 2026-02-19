const { test } = require('node:test');
const assert = require('node:assert');
const { execSync, spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const GSD_JS = path.join(__dirname, '..', 'bin', 'gsd-tools.js');
const GSD_BIN = `node ${GSD_JS}`;
const TEST_DIR = path.join(__dirname, 'test-project');

test('Project Memory System', async (t) => {
    // Setup
    if (fs.existsSync(TEST_DIR)) {
        fs.rmSync(TEST_DIR, { recursive: true, force: true });
    }
    fs.mkdirSync(TEST_DIR);

    await t.test('Initialization', () => {
        execSync(`${GSD_BIN} init`, { cwd: TEST_DIR });
        assert.ok(fs.existsSync(path.join(TEST_DIR, '.planning')));
    });

    await t.test('Commit Memory (Basic)', () => {
        const memoryText = "Test memory entry";
        execSync(`${GSD_BIN} commit-memory "${memoryText}"`, { cwd: TEST_DIR });

        const memoryFile = path.join(TEST_DIR, '.planning', 'memory', 'PROJECT-MEMORY.md');
        assert.ok(fs.existsSync(memoryFile), 'PROJECT-MEMORY.md should exist');

        const content = fs.readFileSync(memoryFile, 'utf8');
        assert.ok(content.includes(memoryText), 'Memory file should contain the committed text');
    });

    await t.test('Commit Memory (Multiple entries)', () => {
        const memoryText2 = "Second test entry";
        execSync(`${GSD_BIN} memo "${memoryText2}"`, { cwd: TEST_DIR });

        const memoryFile = path.join(TEST_DIR, '.planning', 'memory', 'PROJECT-MEMORY.md');
        const content = fs.readFileSync(memoryFile, 'utf8');
        assert.ok(content.includes(memoryText2), 'Memory file should contain the second entry');
        assert.ok(content.includes('---'), 'Entries should be separated by dividers');
    });

    await t.test('Error Handling: No .planning dir', () => {
        const os = require('node:os');
        const TEMP_NO_PLAN = fs.mkdtempSync(path.join(os.tmpdir(), 'gsd-test-'));

        try {
            const result = spawnSync('node', [GSD_JS, 'commit-memory', 'Should fail'], { cwd: TEMP_NO_PLAN });
            const output = (result.stdout?.toString() || '') + (result.stderr?.toString() || '');

            assert.strictEqual(result.status, 1, 'Process should exit with code 1');
            assert.ok(output.includes('No .planning/ directory found'), `Error message missing. Got: ${output}`);
        } finally {
            fs.rmSync(TEMP_NO_PLAN, { recursive: true, force: true });
        }
    });

    // Teardown
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
});
