const request = require('request');

const geocode = (address, callback) => {
	const baseUrl = 'https://api.mapbox.com/search/geocode/v6/forward';
	const queryParams = {
		urlSafeAddress: encodeURIComponent(address),
		// TODO: Don't store the api key here like this
		apiKey: 'pk.eyJ1IjoiZ3JlZW5lYWxleGFuZGVyaiIsImEiOiJjbWMweGMwa2EwNnl5Mmpwcm90ajY1NXlrIn0.8qTd77EOuVwDOecxOOb5ZA',
	};
	const { urlSafeAddress, apiKey } = queryParams;
	//TODO: Make this url construction better
	const url = baseUrl + '?q=' + urlSafeAddress + '&access_token=' + apiKey;

	request({ url, json: true }, (error, { body }) => {
		const { features } = body;
		const [{ geometry, properties }] = features;
		const { full_address: location } = properties;
		const { coordinates } = geometry;
		const latitude = coordinates[1];
		const longitude = coordinates[0];
		if (error) {
			callback('Unable to connect to location services!', undefined);
		} else if (features.length === 0) {
			callback('Unable to find location. Try another search.', undefined);
		} else {
			callback(undefined, {
				latitude,
				longitude,
				location,
			});
		}
	});
};

module.exports = geocode;

// // Geocoding simple example

// const geocodeUrl =
// 	'https://api.mapbox.com/search/geocode/v6/forward?q=&access_token=pk.eyJ1IjoiZ3JlZW5lYWxleGFuZGVyaiIsImEiOiJjbWMweGMwa2EwNnl5Mmpwcm90ajY1NXlrIn0.8qTd77EOuVwDOecxOOb5ZA';

// request({ url: geocodeUrl, json: true }, (error, response) => {
// 	if (error) {
// 		console.log(
// 			'Unable to connect to geocoding service. See error below for details.\n',
// 			error
// 		);
// 	} else if (response.body.features.length === 0) {
// 		console.log('Unable to find location. Please try another search.');
// 	} else {
// 		const latitude = response.body.features[0].geometry.coordinates[1];
// 		const longitude = response.body.features[0].geometry.coordinates[0];
// 		console.log('Latitude: ', latitude);
// 		console.log('Longitude: ', longitude);
// 	}
// });
