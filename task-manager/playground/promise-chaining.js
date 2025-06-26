require('../src/db/mongoose');
const User = require('../src/models/user');

User.findByIdAndUpdate('685d8ffa0f31e982d185d048', { age: 1 })
	.then((user) => {
		console.log(user);
		return User.countDocuments({ age: 0 });
	})
	.then((result) => {
		console.log(result);
	})
	.catch((error) => {
		console.error(error);
	});
