const core = require('@actions/core');
const { Toolkit } = require('actions-toolkit');
const { readFileSync, writeFileSync } = require('fs');
const quotes = require('./Quotes.json');
const { stripIndents } = require('common-tags');
const { spawn } = require('child_process');

let QUOTE_FONT_SIZE = core.getInput('QUOTE_FONT_SIZE');

function getRandomQuote() {
	return quotes[
		Math.floor(quotes.length * Math.random())
	];
}

/**
 * @param {Toolkit} tools
 * @param {string} cmd
 * @param {string[]} args
 */
async function execute(cmd, args = []) {
	new Promise((resolve, reject) => {
		const child = spawn(cmd, args);

		child.stderr.on('data', (data) => {
			return reject(data);
		});

		child.stdout.on('data', (data) => {
			console.log(data);
		});

		child.on('data', (data) => console.log(data));

		resolve();
	});
}

Toolkit
	.run(async (tools) => {
		if(isNaN(QUOTE_FONT_SIZE)) return tools.exit.failure('QUOTE_FONT_SIZE is not a number!');
		QUOTE_FONT_SIZE = Math.floor(Number(QUOTE_FONT_SIZE));

		if(QUOTE_FONT_SIZE > 6 || QUOTE_FONT_SIZE < 1) return tools.exit.failure('QUOTE_FONT_SIZE is out of scope, the value has to be an integer between 1 & 6');

		const readmeContent = readFileSync('./README.md', 'utf-8').split('\n');

		const startIndex = readmeContent.findIndex(content => content.trim() === '<!--QUOTE-BOT:start-->');
		const endIndex = readmeContent.findIndex(content => content.trim() === '<!--QUOTE-BOT:end-->');

		if(startIndex === -1) return tools.exit.failure('Couldn\'t find the <!--QUOTE-BOT:start--> comment! Exiting the process...');
		if(endIndex === -1) return tools.exit.failure('Couldn\'t find the <!--QUOTE-BOT:end--> comment! Exiting the process...');

		if(startIndex !== endIndex) readmeContent.splice(startIndex + 1, (endIndex - startIndex) - 1);

		const quote = getRandomQuote();
		const string = stripIndents`
			${'#'.repeat(QUOTE_FONT_SIZE)} <i>${quote.text}</i><br>
			${'#'.repeat(QUOTE_FONT_SIZE)} - <b>${quote.author}</b><br>		
		`;

		readmeContent.splice(startIndex + 1, 0, string);

		writeFileSync('./README.md', readmeContent.join('\n').toString());

		await execute('git', ['config', '--local', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
		await execute('git', ['config', '--local', 'user.name', 'Trial Bot']);
		await execute('git', ['add', '-A']);
		await execute('git', ['commit', '-m', 'Tried something new?']);
		await execute('git', ['push']);
	}, {
		events: ['schedule', 'workflow_dispatch'],
	});