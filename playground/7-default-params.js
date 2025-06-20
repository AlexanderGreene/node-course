const greeter = (name = 'User', age = 'so many') => {
	console.log('Hello ' + name + '. You are ' + age + ' years old.');
};

const transaction = (type, { label, stock = 0 } = {}) => {
	console.log(type, label, stock);
};

greeter('Alex', 38);
greeter();

transaction('order', { label: 'Cornballer', stock: 100 });
transaction('order');
