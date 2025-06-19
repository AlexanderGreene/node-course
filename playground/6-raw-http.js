const http = require('http');

const url =
	'http://api.weatherstack.com/current?access_key=7b549f097c520ee732a0581c5741fd39&query=39.9465348,-82.9739523&units=f';

const request = http.request(url, (response) => {
	let data = '';

	response.on('data', (chunk) => {
		data = data + chunk.toString();
	});

	response.on('end', () => {
		const body = JSON.parse(data);
		console.log(body);
	});
});

request.on('error', (error) => {
	console.log('An error occurred: ', error);
});

request.end();
