const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const serverRunning = require('./serverRunning');
const {
	generateMessage,
	generateLocationMessage,
} = require('./utils/messages');
const {
	addUser,
	removeUser,
	getUser,
	getUsersInRoom,
} = require('./utils/users');

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

	socket.on('join', ({ username, room }, callback) => {
		const { error, user } = addUser({
			id: socket.id,
			username,
			room,
		});

		if (error) {
			return callback(error);
		}

		socket.join(user.room);

		socket.emit(
			'message',
			generateMessage(`${user.room} (room)`, 'Welcome!')
		);
		socket.broadcast
			.to(user.room)
			.emit(
				'message',
				generateMessage(
					`${user.room} (room)`,
					`${user.username} has joined!`
				)
			);
		io.to(user.room).emit('roomData', {
			room: user.room,
			users: getUsersInRoom(user.room),
		});

		callback();
	});

	socket.on('sendMessage', (message, callback) => {
		const user = getUser(socket.id);
		const filter = new Filter();

		if (filter.isProfane(message)) {
			return callback('No fucking profanity, dipshit!');
		}

		io.to(user.room).emit(
			'message',
			generateMessage(user.username, message)
		);
		callback();
	});

	socket.on('sendLocation', (coords, callback) => {
		const user = getUser(socket.id);
		io.to(user.room).emit(
			'locationMessage',
			generateLocationMessage(user.username, coords)
		);
		callback();
	});

	socket.on('disconnect', () => {
		const user = removeUser(socket.id);
		if (user) {
			io.to(user.room).emit(
				'message',
				generateMessage('System', `${user.username} has left`)
			);
			io.to(user.room).emit('roomData', {
				room: user.room,
				users: getUsersInRoom(user.room),
			});
		}
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
