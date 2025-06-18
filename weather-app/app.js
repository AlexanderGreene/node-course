const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

forecast('43.25769', '-95.8621', (error, response) => {
	console.log(error);
	console.log(response);
});

geocode('123 fake street', (error, data) => {
	console.log('Error: ', error);
	console.log('Data: ', data);
});
