console.log('Client side javascript file is loaded!');

fetch('https://puzzle.mead.io/puzzle').then((response) => {
	response.json().then((data) => {
		console.log(data);
	});
});

const weatherForm = document.querySelector('form');
const searchEle = document.querySelector('input');
const message = document.querySelector('#message');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const location = searchEle.value;
	fetch('http://localhost:3000/weather?address=' + location).then(
		(response) => {
			response.json().then((data) => {
				if (data.error) return (message.textContent = data.error);
				message.textContent =
					data.location +
					'\nIt is currently ' +
					data.description +
					' with a temperature of ' +
					data.temperature +
					', but it feels like ' +
					data.feelslike +
					'.';
			});
		}
	);
});
