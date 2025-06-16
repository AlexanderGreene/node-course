const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => 'Your notes...';

const addNote = (title, body) => {
	const notes = loadNotes();
	const duplicateNote = notes.find((note) => note.title === title);

	if (!duplicateNote) {
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

const removeNote = (title) => {
	const notes = loadNotes();
	//TODO: refactor to use Array.find instead of Array.filter
	const filteredNotes = notes.filter((note) => note.title !== title);
	if (notes.length > filteredNotes.length) {
		console.log(chalk.bgGreen('Note removed!'));
		saveNotes(filteredNotes);
	} else {
		console.log(chalk.bgRed('No note found!'));
	}
};

const listNotes = () => {
	const notes = loadNotes();
	console.log(chalk.bgBlue('Your Notes:'));
	notes.forEach((note) =>
		console.log(chalk.blue(note.title + ': ' + note.body))
	);
};

const readNote = (title) => {
	const notes = loadNotes();
	const noteToDisplay = notes.find((note) => note.title === title);
	if (noteToDisplay) {
		console.log(chalk.bgBlue(noteToDisplay.title));
		console.log(noteToDisplay.body);
	} else {
		console.log(chalk.bgRed('Note with title ' + title + ' not found.'));
	}
};

const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync('notes.json');
		const dataJson = dataBuffer.toString();
		return JSON.parse(dataJson);
	} catch (error) {
		return [];
	}
};

module.exports = {
	getNotes,
	addNote,
	removeNote,
	listNotes,
	readNote,
};
