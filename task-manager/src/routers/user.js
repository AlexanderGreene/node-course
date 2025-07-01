const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/user');

const router = new express.Router();

router.post('/users', async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		const token = await user.generateAuthToken();

		res.status(201).send({ user, token });
	} catch (e) {
		res.status(400).send(e);
	}
});

router.post('/users/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		);
		const token = await user.generateAuthToken();
		res.send({ user, token });
	} catch (e) {
		res.status(403).send(e);
	}
});

router.post('/users/logout', auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token !== req.token;
		});
		await req.user.save();

		res.send('Logged out successfully');
	} catch (e) {
		res.status(500).send(e);
	}
});

router.post('/users/logoutAll', auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save('Logged out of all sessions successfully');
		res.send();
	} catch (e) {
		res.status(500).send(e);
	}
});

router.get('/users/me', auth, async (req, res) => {
	res.send(req.user);
});

router.patch('/users/me', auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['name', 'email', 'password', 'age'];
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation)
		return res.status(400).send({ error: 'Invalid updates.' });

	try {
		// If we didn't need to run middleware on updates we could do it this way
		// const user = await User.findByIdAndUpdate(_id, req.body, {
		// 	new: true,
		// 	runValidators: true,
		// });

		updates.forEach((update) => (req.user[update] = req.body[update]));

		await req.user.save();

		res.send(req.user);
	} catch (e) {
		res.status(500).send(e);
	}
});

router.delete('/users/me', auth, async (req, res) => {
	try {
		await req.user.remove();
		res.send(req.user);
	} catch (e) {
		res.status(500).send(e);
	}
});

// DECOMISSIONED ROUTES

router.get('/users', auth, async (req, res) => {
	res.send('Not implemented.');
	// logged in users should not be able to get every single user in the db
	// commented out as an example, but could be turned into an admin function
	// if roles are introduced
	// 	try {
	// 		const users = await User.find({});
	// 		if (users.length === 0) return res.status(404).send('No users found.');
	// 		res.send(users);
	// 	} catch (e) {
	// 		res.status(500).send(e);
	// 	}
});

router.get('/users/:id', async (req, res) => {
	res.send('Not implemented.');
	// logged in users should not be able to get a single user in the db by their id
	// commented out as an example, but could be turned into an admin function
	// if roles are introduced
	// 	const _id = req.params.id;
	// 	try {
	// 		const user = await User.findById(_id);
	// 		if (!user)
	// 			return res.status(404).send(`User with id ${_id} not found.`);
	// 		res.send(user);
	// 	} catch (e) {
	// 		res.status(500).send(e);
	// 	}
});

router.patch('/users/:id', async (req, res) => {
	res.send('Not implemented.');
	// logged in users should not be able to update a single user in the db by their id
	// commented out as an example, but could be turned into an admin function
	// if roles are introduced
	// const updates = Object.keys(req.body);
	// const allowedUpdates = ['name', 'email', 'password', 'age'];
	// const isValidOperation = updates.every((update) =>
	// 	allowedUpdates.includes(update)
	// );

	// if (!isValidOperation)
	// 	return res.status(400).send({ error: 'Invalid updates.' });

	// const _id = req.params.id;
	// try {
	// 	const user = await User.findById(req.params.id);

	// 	// If we didn't need to run middleware on updates we could do it this way
	// 	// const user = await User.findByIdAndUpdate(_id, req.body, {
	// 	// 	new: true,
	// 	// 	runValidators: true,
	// 	// });

	// 	if (!user)
	// 		return res.status(404).send(`User with id ${_id} not found.`);

	// 	updates.forEach((update) => (user[update] = req.body[update]));

	// 	await user.save();

	// 	res.send(user);
	// } catch (e) {
	// 	res.status(500).send(e);
	// }
});

router.delete('/users/:id', auth, async (req, res) => {
	res.send('Not implemented.');
	// logged in users should not be able to delete a single user in the db by their id
	// commented out as an example, but could be turned into an admin function
	// if roles are introduced
	// const _id = req.params.id;
	// try {
	// 	const user = await User.findByIdAndDelete(_id);
	// 	if (!user) return res.status(404).send();
	// 	res.send(user);
	// } catch (e) {
	// 	res.status(500).send(e);
	// }
});

module.exports = router;
