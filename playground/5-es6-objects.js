// Object property shorthand

const name = 'Alex';
const userAge = 38;

const user = {
	name,
	age: userAge,
	location: 'Columbus',
};

console.log(user);

//Object destructuring
const product = {
	label: 'Red Notebook',
	price: 3,
	stock: 201,
	salePrice: undefined,
};

// Accessing properties from the product object without destructuring
// const label = product.label;
// const stock = product.stock;

// Accessing properties from the product object with destructuring
// const { label: productLabel, stock, rating = 5 } = product;

// console.log(productLabel);
// console.log(stock);
// console.log(rating); // prints undefined unless default value is defined

const transaction = (type, { label, stock }) => {
	console.log(type, label, stock);
};

transaction('order', product);
