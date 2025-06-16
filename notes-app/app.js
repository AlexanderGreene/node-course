const fs = require('fs');
const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

// Set version for yargs
yargs.version('1.0.1');

// Register commands

// Add
yargs.command({
	command: 'add',
	describe: 'Add a new note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string',
		},
		body: {
			describe: 'Note body',
			demandOption: true,
			type: 'string',
		},
	},
	handler: function (argv) {
		notes.addNote(argv.title, argv.body);
	},
});

// Remove
yargs.command({
	command: 'remove',
	describe: 'Remove an existing note',
	builder: {
		title: {
			describe: 'Title of note to be removed',
			demandOption: true,
			type: 'string',
		},
	},
	handler: function (argv) {
		notes.removeNote(argv.title);
	},
});

// List
yargs.command({
	command: 'list',
	describe: 'Show list of notes',
	handler: function () {
		console.log(chalk.gray('Listing the notes'));
	},
});

// Read
yargs.command({
	command: 'read',
	describe: 'Read a note',
	handler: function () {
		console.log(chalk.bgGray('Reading a note'));
	},
});

yargs.parse();

// removed statements
// fs.writeFileSync('notes.txt', 'This file was created by Node.js!');
// fs.appendFileSync('notes.txt', ' This file was appended by Node.js!');
// console.log(validator.isURL('https://lmgtfy.com'));
// const notes = getNotes();
// const successMsg = chalk.green('Success!')
// console.log(notes);
// console.log(successMsg);
// console.log(process.argv);
