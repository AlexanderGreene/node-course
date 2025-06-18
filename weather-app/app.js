const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

geocode('123 fake street', (error, data) => {
	if (error) return console.log(error);

	forecast(data.latitude, data.longitude, (error, response) => {
		if (error) return console.log(error);

		console.log('Weather for:', data.location);
		console.log(response);
	});
});
