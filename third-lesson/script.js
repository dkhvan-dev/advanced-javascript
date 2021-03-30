"use strict";

// Запуск функции добавления товаров в корзину
function addToBasket(id) {
	cart.addItem(id);
}

// Запуск функции удаления товаров из корзины
function deleteFromBasket(id) {
	cart.deleteItem(id);
	
}

// Содержимое корзины
function viewCart() {
	cart.render();
}

// Открытие корзины по кнопке "Корзина"
let k=1;
function CartOpen() {
	k--;
	if (k==0) {
		document.querySelector('.cart').style.display = "block";
		document.querySelector('.cart').insertAdjacentHTML('afterbegin', '<h2>Ваши добавленные товары:</h2><br>');
	}
}

class Header {
	constructor() {
		this.$search = document.querySelector('#search');
	}

	setSearchHandler(callback) {
		this.$search.addEventListener('input', callback);
	}
}

class Api {
	constructor() {
		this.url = '/base.json';
	}

	fetch(error, success) {
		let xhr;

		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}

		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					success(xhr.responseText);
				} else if (xhr.status > 400) {
					error('Ошибка!');
				}
			}
		}

		xhr.open('GET', this.url, true);
		xhr.send();
	}

	fromJSON(data) {
		return new Promise((resolve) => {
			resolve(JSON.parse(data));
		});
	}

	fetchPromise() {
		return new Promise((resolve, reject) => {
			this.fetch(reject, resolve);
		});
	}
}

class GoodsItem {
	constructor(id,title, price, src) {
		this.id = id;
		this.title = title;
		this.price = price;
		this.src = src;
	}

	getHtml() {
		return `<div class="goods-item"><img src="${this.src}"><h3>${this.title}</h3><p>${this.price}</p><button type="button" class="add-button" onclick='addToBasket(${this.id})'>Добавить</button></div>`;
	}
}

class GoodsList {
	constructor() {
		this.api = new Api();
		this.$goodsList = document.querySelector('.goods-list');
		this.goods = [];

		this.header = new Header();
		this.filteredGoods = [];

		this.header.setSearchHandler((e) => {
			this.search(e.target.value);
		});

		const fetch = this.api.fetchPromise();
			fetch.then((response) => this.api.fromJSON(response))
			.then((data) => {this.onFetchSuccess(data)})
			.catch((err) => {this.onFetchError(err)});
	}

	search(str) {
		if (str === '') {
			this.filteredGoods = this.goods;
		}
		const regexp = new RegExp(str, 'gi');
		this.filteredGoods = this.goods.filter((good) => regexp.test(good.title));
		this.render();
	}

	onFetchSuccess(data) {
		this.goods = data.map(({id, title, price, src}) => new GoodsItem(id, title, price, src));
		this.filteredGoods = this.goods;
		this.render();
	}

	onFetchError(err) {
		this.$goodsList.insertAdjacentHTML('beforeend', `<h3>${err}</h3>`);
	}

	render() {
		this.$goodsList.textContent = '';
		this.filteredGoods.forEach((good) => {
			this.$goodsList.insertAdjacentHTML('beforeend', good.getHtml());
		});
	}
}

class BasketItem {
	constructor(id, title, price, src) {
		this.id = id;
		this.title = title;
		this.price = price;
		this.src = src;
	}

	render() {
		return `<div class="basket-item"><img src="${this.src}"><h3>${this.title}</h3><p>${this.price}</p><button type="button" class="delete-from-basket" onclick='deleteFromBasket(${this.id})>Удалить</button></div>`;
	}
}

class Basket {
	constructor() {
		// API, взятый из GoodsItem
		this.api = new Api();
		
		// Переменная товаров, добавленных в корзину
		this.cartGoods = [];
		
		// Переменная массива всех стоимостей товаров, по порядку их добавления
		this.costArr = [];

		// Переменная индекса товара, добавленного в корзину
		this.increment = -1;

		// Переменная массива всех индексов товаров, добавленных в корзину
		this.newVariable = [];
	}
	
	// Добавление товара
	addItem(id) {
		// Объект товара, добавленного в корзину
		let addToBasket;

		list.goods.forEach((item) => {
			if (id == item.id) {
				addToBasket = {
					id: item.id,
					title: item.title,
					price: item.price,
					src: item.src,
				}
			}
		});

		this.cartGoods.push(addToBasket);

		document.querySelector('.cart-goods').insertAdjacentHTML('beforeend', `<div class="basket-item ${this.increment+1}"><img src="${addToBasket.src}"><h3>${addToBasket.title}</h3><p>${addToBasket.price}</p><button type="button" class="delete-from-basket" onclick='deleteFromBasket(${addToBasket.id})'>Удалить</button></div>`);

		this.increment++;
		this.newVariable.push(this.increment);

		this.cost();
		this.basketCount();

		console.log(this.newVariable);
	}

	// Удаление товара
	deleteItem(id) {
		// Индекс товара, удаленного из корзины
		let deleteFromBasket;
		this.cartGoods.forEach((item, i) => {
			let itemId = item.id;
			if (id == itemId) {
				deleteFromBasket = i;
			}
		});

		// Калибровка стоимости при удалении товара из корзины.
		this.cartGoods.splice(deleteFromBasket, 1);
		console.log(this.cartGoods);

		// Извлечение элемента массива newVariable, который отвечает за удаленный товар
		let IndexDeleteProduct = this.newVariable.splice(deleteFromBasket, 1);
		console.log(IndexDeleteProduct[0]);

		if (this.costArr[this.costArr.length-1] == undefined) {
			this.costArr[0] = 0;
		}

		// Массив всех товаров, находящихся в корзине
		// Удаление товара визуально
		let deleteProduct = document.querySelectorAll('.basket-item');
		
		if (deleteProduct[IndexDeleteProduct[0]] == this.newVariable[deleteFromBasket]) deleteProduct[IndexDeleteProduct[0]].remove(); else deleteProduct[deleteFromBasket].remove();

		// !НЕ ХОЧЕТ УДАЛЯТЬ ПОСЛЕДНИЙ ЭЛЕМЕНТ! НЕ ЗНАЮ ПОЧЕМУ.
		if (this.newVariable.length == 1) deleteProduct[0].remove();

		console.log(this.newVariable);

		this.basketCount();
		this.cost();
	}

	// Стоимость товаров
	cost() {
		let totalCost = 0;
		this.cartGoods.forEach((good) => {
			if (good.price !== undefined) {
				totalCost += good.price;
			}
		});

		this.costArr.push(totalCost);

		document.querySelector('.goods-total').innerHTML = `<div class=".goods-total"><h3>Общая стоимость товаров: ${totalCost}</h3></div>`;
	}

	basketCount() {
		let count = this.cartGoods.length;
		document.querySelector('#cart-count').innerHTML = `(${count})`;
	}
}

const list = new GoodsList();
const cart = new Basket();

let cartButton = document.querySelector('.cart-button');
cartButton.addEventListener('click', CartOpen);
