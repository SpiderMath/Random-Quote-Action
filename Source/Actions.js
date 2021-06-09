const quotes = require('./Quotes.json');
const core = require('@actions/core');
const { spawn } = require('child_process');

const GH_USERNAME = core.getInput('GH_USERNAME');
const COMMIT_MESSAGE = core.getInput('COMMIT_MESSAGE');

// Execute shell commands FIRST
function exec(cmd, args = []) {
	new Promise((resolve, reject) => {
		const app = spawn(cmd, args, { stdio: 'pipe' });
		let stdout = '';
		app.stdout.on('data', (data) => {
			stdout = data;
		});
		app.on('close', (code) => {
			if (code !== 0 && !stdout.includes('nothing to commit')) {
				const err = new Error(`Invalid status code: ${code}`);
				err.code = code;
				return reject(err);
			}
			return resolve(code);
		});
		app.on('error', reject);
	});
}

function getRandomQuote() {
	return quotes[
		Math.floor(quotes.length * Math.random())
	];
}

// Commits the file
async function commitFile() {
	await exec('git', [
		'config',
		'--global',
		'user.email',
		'41898282+github-actions[bot]@users.noreply.github.com',
	]);
	await exec('git', ['config', '--global', 'user.name', 'readme-bot']);
	await exec('git', ['add', 'README.md']);
	await exec('git', ['commit', '-m', COMMIT_MESSAGE]);
	await exec('git', ['push']);
}