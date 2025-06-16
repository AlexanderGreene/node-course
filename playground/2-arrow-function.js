const square = function (num) {
	return num * num;
};

const squareArrow = (num) => {
	return num * num;
};

const squareShorthand = (num) => num * num;

const party = {
	name: 'Birthday Party',
	printGuestList: function () {
		console.log('Guest list for ' + this.name);
	},
};

// const partyArrow = () => {
//     name: 'Arrow Birthday Party',
//     printGuestList: () => {
//         //fails because arrow functions do not have access to 'this' self-binding to current context (obj)
//         // console.log('Guest list for ' + this.name)
//         return
//     }
// }

const partyShorthand = {
	name: 'Birthday Party',
	guestList: ['Alex', 'Bob', 'Charlie', 'David', 'Evan'],
	printGuestList() {
		console.log('Guest list for ' + this.name);
		// Arrow function does not bind its own 'this' so it has access to 'this' from parent function
		// which is written in shorthand function notation and does have access to 'this' binding from
		// current context
		this.guestList.forEach((guest) => {
			console.log(guest + ' is attending ' + this.name);
		});
	},
};

const testValue = 3;
console.log(square(testValue));
console.log(squareArrow(testValue));
console.log(squareShorthand(testValue));
party.printGuestList();
// partyArrow.printGuestList();
partyShorthand.printGuestList();
