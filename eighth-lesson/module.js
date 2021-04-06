import {EventEmitter} from 'events';

export const totalCostCalc = () => {
	let totalPrice = 0;
	this.cart.forEach((item) => {
		if (item.price !== undefined) {
			totalPrice += item.price * item.quantity;
		}
	});
	this.totalCost = totalPrice;
};

export const test = (text) => `hello, ${text}`;

export const myModule = new EventEmitter();