"use strict";

class ApiMock {
	constructor() {

	}

	fetch() {
		return [
			{title: 'Shirt', price: 150, src: 'img/shirt.jpg'},
			{title: 'Socks', price: 50, src: 'img/socks.jpg'},
			{title: 'Jacket', price: 350, src: 'img/jacket.jpg'},
			{title: 'Shoes', price: 250, src: 'img/shoes.jpg'},
		];
	}
}

class GoodsItem {
	constructor(title, price, src) {
		this.title = title;
		this.price = price;
		this.src = src;
	}

	getHtml() {
		return `<div class="goods-item"><img src="${this.src}"><h3>${this.title}</h3><p>${this.price}</p><button>Добавить</button></div>`;
	}
}

class GoodsList {
	constructor() {
		this.api = new ApiMock();
		this.$goodsList = document.querySelector('.goods-list');
		this.goods = [];
	}

	fetchGoods() {
		this.goods = this.api.fetch().map(({title, price, src}) => new GoodsItem(title, price, src));
	}

	render() {
		this.$goodsList.textContent = "";
		this.goods.forEach((good) => {
			this.$goodsList.insertAdjacentHTML('beforeend', good.getHtml());
		})
	}

	getNumber(max) {
		return Math.floor(Math.random() * max);
	}

	sum() {
		let cost = 0;
		this.prices = this.api.fetch().map(({title, price, src}) => new GoodsItem(title, price, src));

		this.api.fetch().forEach((prices) => {
			if (prices.price !== undefined) {
				cost += prices.price;
				console.log(prices.price);
			}
		})

		let costText = `Стоимость товаров: ${cost}`;

		this.$goodsList.insertAdjacentHTML('afterend', `<div class="cost"><h3>${costText}</h3></div>`);
	}
}

// Класс для элемента корзины

class BasketItem {
	constructor(title, price, src) {
		this.title = title;
		this.price = price;
		this.src = src;
	}
}

// Класс для корзины
class Basket {
	constructor() {
		// Массивы добавленных товаров и удаленных
		this.addGood = [];
		this.deleteGood = [];
	}
	// Добавление товара
	addItem() {

	}

	// Удаление товара
	deleteItem() {

	}

	// Стоимость товаров
	cost() {

	}
}

const goodsList = new GoodsList();

goodsList.fetchGoods();
goodsList.render();
goodsList.sum();