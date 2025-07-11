const socket = io();

// server (emit) -> client (receive) --acknowledgement -> server
// client (emit) -> server (receive) --acknowledgement -> client

const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');

socket.on('message', (message) => {
	console.log(message);
});

$messageForm.addEventListener('submit', (e) => {
	e.preventDefault();

	$messageFormButton.setAttribute('disabled', 'disabled');

	const message = e.target.elements.message.value;

	socket.emit('sendMessage', message, (error) => {
		$messageFormButton.removeAttribute('disabled');
		$messageFormInput.value = '';
		$messageFormInput.focus();

		if (error) return console.error(error);

		console.log('Message delivered!');
	});
});

document.querySelector('#send-location').addEventListener('click', () => {
	if (!navigator.geolocation)
		return alert('Geolocation is not supported by your browser');

	navigator.geolocation.getCurrentPosition((position) => {
		socket.emit(
			'sendLocation',
			{
				lat: position.coords.latitude,
				long: position.coords.longitude,
			},
			() => {
				console.log('Location sent!');
			}
		);
	});
});

// Counter example
// socket.on('countUpdated', (count) => {
// 	console.log('The count has been updated', count);
// });

// document.querySelector('#increment').addEventListener('click', () => {
// 	console.log('Clicked');
// 	socket.emit('increment');
// });
