const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
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

io.on('connection', (socket) => {
	console.log('New WebSocket connection');

	socket.emit('message', 'Welcome!');
	socket.broadcast.emit('message', 'A new user has joined!');

	socket.on('sendMessage', (message, callback) => {
		const filter = new Filter();

		if (filter.isProfane(message)) {
			return callback('No fucking profanity, dipshit!');
		}

		io.emit('message', message);
		callback();
	});

	socket.on('sendLocation', (coords, callback) => {
		io.emit(
			'message',
			`Location: https://google.com/maps?q=${coords.lat},${coords.long}`
		);
		callback();
	});

	socket.on('disconnect', () => {
		io.emit('message', 'A user has left :(');
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
