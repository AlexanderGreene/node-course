const mongoose = require('mongoose');
const validator = require('validator');
// import mongoose from 'mongoose';
// import validator from 'validator';

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
	// deprecated connection options, but were used in the class. leaving for posterity
	// useNewUrlParser: true,
	// useCreateIndex: true,
	// useUnifiedTopology: true,
});

const User = mongoose.model('User', {
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Email is invalid.');
			}
		},
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error('Age must not be negative.');
			}
		},
	},
	password: {
		type: String,
		required: true,
		minlength: 7,
		trim: true,
		validate(value) {
			if (value.toLowerCase().includes('password'))
				throw new Error(
					'Come on bud...You can think of a better password than that.'
				);
		},
	},
});

const Task = mongoose.model('Task', {
	description: {
		type: String,
		required: true,
		trim: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
});

const me = new User({
	name: 'Devon',
	email: 'notreallydevon@email.com',
	age: 44,
	password: 'nicePaSsWoRd',
});

const it = new Task({
	description: 'Do it! Seriously!',
	completed: false,
});

// uncomment this and switch the require/import statements to view collections without Compass
// const usersQuery = await User.find().exec();
// const tasksQuery = await Task.find().exec();

// console.log(usersQuery);
// console.log(tasksQuery);

// Commented out so it doesn't create duplicate records
// Uncomment to populate new instance of db
// me.save()
// 	.then(() => {
// 		console.log(me);
// 	})
// 	.catch((error) => {
// 		console.error('Error!', error);
// 	});

// it.save()
// 	.then(() => {
// 		console.log(it);
// 	})
// 	.catch((error) => {
// 		console.error('Error!', error);
// 	});
