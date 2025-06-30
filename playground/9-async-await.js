const add = (a, b) => {
	return new Promise((resolve, reject) => {
		if (a < 0 || b < 0) return reject('Numbers must be non-negative');
		setTimeout(() => {
			resolve(a + b);
		}, 2000);
	});
};

const doWork = async () => {
	// return 'Success!'; -- fulfill/resolve the promise with the value
	//throw new Error('Error!'); -- reject the promise with an error message
	const sum = await add(1, 99);
	const sum2 = await add(sum, 50);
	const sum3 = await add(sum2, -3);

	return sum3;
};

doWork()
	.then((result) => {
		console.log('result', result);
	})
	.catch((e) => {
		console.error(e);
	});
