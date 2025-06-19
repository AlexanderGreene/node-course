const path = require('path');
const express = require('express');
const hbs = require('hbs');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

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

// app.com/weather
app.get('/weather', (req, res) => {
	res.send({
		location: 'Columbus, Ohio, USA',
		forecast: {
			description: 'Overcast',
			temperature: 77,
			feelslike: 79,
		},
	});
});

app.listen(3000, () => {
	console.log('Server running on port 3000.');
});
