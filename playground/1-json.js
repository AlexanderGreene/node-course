const fs = require('fs');

// const book = {
// 	title: 'All Systems Red',
// 	author: 'Martha Wells',
// };

// const bookJSON = JSON.stringify(book);
// fs.writeFileSync('1-json.json', bookJSON);

// const dataBuffer = fs.readFileSync('1-json.json');
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON);
// console.log(data.title);

const dataBuffer = fs.readFileSync('1-json.json');
const dataJSON = dataBuffer.toString();
const user = JSON.parse(dataJSON);

user.name = 'Gunther';
user.age = 69;

const userJSON = JSON.stringify(user);
fs.writeFileSync('1-json.json', userJSON);
