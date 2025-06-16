const fs = require('fs');
const chalk = require('chalk');

const getNotes = function () {
	return 'Your notes...';
};

const addNote = function (title, body) {
	const notes = loadNotes();
	const duplicateNotes = notes.filter(function (note) {
		return note.title === title;
	});

	if (duplicateNotes.length === 0) {
		notes.push({
			title,
			body,
		});

		saveNotes(notes);
		console.log(chalk.bgGreen('New note "' + title + '" added!'));
	} else {
		console.log(chalk.bgRed('Note title "' + title + '" already in use!'));
		console.log(chalk.red('Notes must have unique titles!'));
	}
};

const removeNote = function (title) {
	const notes = loadNotes();
	const filteredNotes = notes.filter(function (note) {
		return note.title !== title;
	});
	if (notes.length > filteredNotes.length) {
		console.log(chalk.bgGreen('Note removed!'));
		saveNotes(filteredNotes);
	} else {
		console.log(chalk.bgRed('No note found!'));
	}
};

const saveNotes = function (notes) {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = function () {
	try {
		const dataBuffer = fs.readFileSync('notes.json');
		const dataJson = dataBuffer.toString();
		return JSON.parse(dataJson);
	} catch (error) {
		return [];
	}
};

module.exports = {
	getNotes: getNotes,
	addNote: addNote,
	removeNote: removeNote,
};
