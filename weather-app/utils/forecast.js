const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url =
		'http://api.weatherstack.com/current?access_key=7b549f097c520ee732a0581c5741fd39&query=' +
		encodeURIComponent(latitude) +
		',' +
		encodeURIComponent(longitude) +
		'&units=f';

	request({ url: url, json: true }, (error, response) => {
		if (error) {
			callback(
				'Unable to connect to weather service. See error below for details.\n' +
					error,
				undefined
			);
		} else if (response.body.error) {
			callback(response.body.error.info, undefined);
		} else {
			callback(undefined, {
				description: response.body.current.weather_descriptions[0],
				temperature: response.body.current.temperature,
				feelslike: response.body.current.feelslike,
			});
		}
	});
};

module.exports = forecast;

// // Weather simple example

// request({ url: url, json: true }, (error, response) => {
// 	if (error) {
// 		console.log(
// 			'Unable to connect to weather service. See error below for details.\n',
// 			error
// 		);
// 	} else if (response.body.error) {
// 		console.log(
// 			'Unable to find location. See error below for details.\n',
// 			response.body.error.info
// 		);
// 	} else {
// 		console.log(
// 			'The weather is currently ' +
// 				response.body.current.weather_descriptions[0].toLowerCase() +
// 				'. It is ' +
// 				response.body.current.temperature +
// 				' degrees out, but it feels like ' +
// 				response.body.current.feelslike +
// 				' degrees.'
// 		);
// 	}
// });
