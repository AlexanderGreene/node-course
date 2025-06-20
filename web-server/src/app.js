const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
console.log(publicDirectoryPath, viewsPath, partialsPath);

// enroll handlebars and views location into express
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// app.com
app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App!',
		name: 'Alex Greene',
	});
});

// app.com/about
app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About!',
		name: 'Alex Greene',
		description: 'handsome',
	});
});

// app.com/help
app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help!',
		name: 'Alex Greene',
		suggestion: 'turning it on and off again',
	});
});

// Commented out because it causes an error in path-to-regexp
// Awaiting response from course instructor
// app.get('/help/*', (req, res) => {
// 	res.render('404', {
// 		title: "404'd!",
//		name: 'Alex Greene',
// 		message:
// 			"I couldn't find that help article!. Looks like you're on your own!",
// 	});
// });

// app.com/weather
app.get('/weather', (req, res) => {
	const { query } = req;
	if (!query.address) {
		return res.send({
			error: 'No address entered, please try again.',
		});
	}
	geocode(query.address, (error, { latitude, longitude, location }) => {
		if (error) return res.send({ error });
		forecast(
			latitude,
			longitude,
			(error, { description, temperature, feelslike }) => {
				if (error) return res.send({ error });
				const { address } = query;
				res.send({
					address,
					location,
					description,
					temperature,
					feelslike,
				});
			}
		);
	});
	// res.send({
	// 	address: query.address,
	// 	location: 'Columbus, Ohio, USA',
	// 	forecast: {
	// 		description: 'Overcast',
	// 		temperature: 77,
	// 		feelslike: 79,
	// 	},
	// });
});

// Demonstration endpoint (doesn't really do anything)
// app.get('/products', (req, res) => {
// 	if (!req.query.search) {
// 		return res.send({
// 			error: 'You must provide a search term!',
// 		});
// 	}
// 	res.send({
// 		products: [],
// 	});
// });

// Commented out because it causes an error in path-to-regexp
// Awaiting response from course instructor
// app.get('*', (req, res) => {
// 	res.render('404', {
// 		title: "404'd!",
//		name: 'Alex Greene',
// 		message: "I couldn't find the thing. Try another thing!",
// 	});
// });

app.listen(3000, () => {
	console.log('Server running on port 3000.');
});
