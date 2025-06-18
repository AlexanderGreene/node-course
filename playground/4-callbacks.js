setTimeout(() => {
	console.log('This message is delayed by 2 seconds');
}, 2000);

const names = ['Alexander', 'Ben', 'Carl'];
const shortNames = names.filter((name) => {
	return name.length <= 4;
});

// this code doesn't really do anything
const geocode = (address, callback) => {
	setTimeout(() => {
		const data = {
			latitude: 0,
			longitude: 0,
		};

		callback(data);
	}, 2000);
};

geocode('Philadelphia', (data) => console.log(data));

const add = (a, b, callback) => {
	setTimeout(() => {
		const sum = a + b;

		callback(sum);
	}, 2500);
};

add(1, 4, (sum) => console.log(sum));
