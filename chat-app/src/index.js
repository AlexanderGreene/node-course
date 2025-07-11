const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const {
	generateMessage,
	generateLocationMessage,
} = require('./utils/messages');
const serverRunning = require('./serverRunning');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

// let count = 0;
// server (emit) --> client (receive) - countUpdated
// client (emit) --> server (receive) - increment

// room agnostic
// socket.emit, io.emit, socket.broadcast.emit
// with rooms
// io.to.emit, socket.broadcast.to.emit

io.on('connection', (socket) => {
	console.log('New WebSocket connection');

	socket.on('join', ({ username, room }) => {
		socket.join(room);

		socket.emit('message', generateMessage('Welcome!'));
		socket.broadcast
			.to(room)
			.emit('message', generateMessage(`${username} has joined!`));
	});

	socket.on('sendMessage', (message, callback) => {
		const filter = new Filter();

		if (filter.isProfane(message)) {
			return callback('No fucking profanity, dipshit!');
		}

		io.to('ancient egypt').emit('message', generateMessage(message));
		callback();
	});

	socket.on('sendLocation', (coords, callback) => {
		io.emit('locationMessage', generateLocationMessage(coords));
		callback();
	});

	socket.on('disconnect', () => {
		io.emit('message', generateMessage('A user has left :('));
	});
	// Counter example
	// socket.emit('countUpdated', count);

	// socket.on('increment', () => {
	// 	count++;
	// 	// socket.emit('countUpdated', count); --emit to just single particular connection
	// 	io.emit('countUpdated', count); // emit to all connections
	// });
});

// app.com
app.get('', (req, res) => {
	res.render('index');
});

server.listen(port, () => {
	console.log(serverRunning);
	console.log('Server running on port ' + port + '!');
});
