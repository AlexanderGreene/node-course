// Promise chaining lesson

const add = (a, b) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(a + b);
		}, 2000);
	});
};
// without promise chaining
add(1, 2)
	.then((sum) => {
		console.log(sum);
		add(sum, 5)
			.then((sum2) => {
				console.log(sum2);
			})
			.catch((e) => {
				console.error(e);
			});
	})
	.catch((e) => {
		console.error(e);
	});
// with promise chaining
add(1, 2)
	.then((sum) => {
		console.log(sum);
		return add(sum, 4);
	})
	.then((sum2) => {
		console.log(sum2);
	})
	.catch((error) => {
		console.error(error);
	});

// Intro to promises
// const randomNumber = (min, max) => {
// 	return Math.floor(Math.random() * (max - min + 1)) + min;
// };

// const doWorkPromise = new Promise((resolve, reject) => {
// 	const numbers = [randomNumber(1, 100), randomNumber(1, 100)];
// 	const isOdd = randomNumber(numbers[0], numbers[1]) % 2 === 0;
// 	setTimeout(() => {
// 		if (isOdd) {
// 			// simulated failure
// 			reject('Well that was odd...');
// 		} else {
// 			// simulated success
// 			resolve(numbers);
// 		}
// 	}, 2000);
// });

// doWorkPromise
// 	.then((result) => {
// 		console.log('Success!', result);
// 	})
// 	.catch((error) => {
// 		console.error('Error!', error);
// 	});
