const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const address = process.argv[2];

if (!address) {
	console.log('Please provide an address.');
} else {
	geocode(address, (error, { latitude, longitude, location } = {}) => {
		if (error) return console.log(error);

		forecast(latitude, longitude, (error, response) => {
			if (error) return console.log(error);

			console.log('Weather for:', location);
			console.log(response);
		});
	});
}
