import {myModule} from './module.js';

const app = new Vue({
	el: '#app',

	data: {
		search: '',
		goods: [],
		filteredGoods: [],
		cart: [],
		cartCount: 0,
		isCartOpen: false,
		addGoodPrices: [],
		deletedGoodsFromCart: [],
		totalCost: 0,
		errorRequest: false,
		buttons: []
	},

	methods: {

		// Запрос GET
		makeGETRequest(url) {
			return new Promise((resolve, reject) => {
				let xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject;
				xhr.open('GET', url, true);
				xhr.onload = function() {resolve(JSON.parse(xhr.responseText))} ;
				xhr.onerror = () => reject(xhr.statusText);
				xhr.send();
			});
		},

		// Запрос POST
		makePOSTRequest(url, data) {
			return new Promise((resolve, reject) => {
				let xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject;
				xhr.open('POST', url, true);
				xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
				xhr.onload = () => resolve(JSON.parse(xhr.responseText));
				xhr.onerror = () => reject(xhr.statusText);
				xhr.send(JSON.stringify(data));
			});
		},

		// Поисковик
		searchHandler() {
			if (this.search === '') {
				this.filteredGoods = this.goods;
			}
			const regexp = new RegExp(this.search, 'gi');
			this.filteredGoods = this.goods.filter((good) => regexp.test(good.title));
		},

		// Добавление товара в корзину
		addToCart(e) {
			const id = e.target.id;
			let itemCart;

			this.filteredGoods.forEach((item) => {
				if (id == item.id) {
					itemCart = {
						id: item.id,
						title: item.title,
						price: item.price,
						src: item.src,
						quantity: item.quantity
					};
				}
			});
			
			this.cart.push(itemCart);
			e.target.classList.add('inCart');
			
			this.totalCostCalc();

			//this.makePOSTRequest('/addToCart', itemCart);
		},

		// Увеличение количества определенного товара в корзине
		addItemToCart(e) {
			const index = e.target.dataset.index;

			this.filteredGoods.forEach((item) => {
				if (this.cart[index].id == item.id) {
					this.cart[index].quantity++;
				}
			});

			this.cartCount++;
			this.totalCostCalc();

			this.makePOSTRequest('/updateCart', this.cart);
		},

		// Удаление товара из корзины
		deleteFromCart(e) {
			this.buttons = document.querySelectorAll('.add-good-to-cart');
			const index = e.target.dataset.index;

			
			this.buttons.forEach((item) => {
				if (this.cart[index].id == item.id && this.cart[index].quantity == 1) {
					item.classList.remove('inCart');
				}
			});

			if (this.cart[index].quantity > 1) {
				this.cart[index].quantity--;
			} else if (this.cart[index].quantity == 1) {
				this.cart.splice(index, 1);
			}

			this.cartCount--;
			this.totalCostCalc();

			this.makePOSTRequest('/updateCart', this.cart);
		},

		// Подсчет стоимости корзины
		totalCostCalc() {
			console.log(this.cart);
			let totalPrice = 0;
			this.cart.forEach((item) => {
				if (item.price !== undefined) {
					totalPrice += item.price * item.quantity;
				}
			});
			this.totalCost = totalPrice;
		},

		// Открытие\Закрытие корзины
		openCartHandler() {
			this.isCartOpen = !this.isCartOpen;
		},
	},

	async created() {
		try {
			myModule.on('addToBasket', this.addToCart.bind(this));
			myModule.on('addItemToBasket', this.addItemToCart.bind(this));
			myModule.on('deleteItemFromBasket', this.deleteFromCart.bind(this));
			this.goods = await this.makeGETRequest('/catalog');
			this.filteredGoods = this.goods;

			this.cart = await this.makeGETRequest('/cart');
			this.totalCostCalc();
		} catch(err) {
			console.error(err);
		}
	},

	mounted() {
	}
});

// Компонент каталога товаров
Vue.component('goods-list', {
	template: `<section class="goods-list">
	<goods-item :good="good" :id="id" v-for="(good, id) in goods"></goods-item>
	<slot name="nothing"></slot>
	</section>`,
	props: ['goods']
});

// Компонент каждого товара каталога
Vue.component('goods-item', {
	template: `<div class="goods-item">
	<img v-bind:src="good.src">
	<h3>{{ good.title }}</h3>
	<p>{{ good.price }}</p>
	<button type="button" :id="good.id" v-on:click="addProductToCart" class="add-good-to-cart">Добавить в корзину</button></div>`,
	props: ['good', 'id'],
	methods: {
		addProductToCart(event) {
			myModule.emit('addToBasket', event);
		}
	}
});

// Компонент списка товаров корзины
Vue.component('cart-list', {
	template: `<div class="cart-list">
	<cart-item :good="good" :index="index" v-for="(good, index) in cart"></cart-item>
	</div>`,
	props: ['cart']
});

// Компонент каждого товара корзины
Vue.component('cart-item', {
	template: `<div class="cart-item">
	<img :src="good.src">
	<h3>{{ good.title }}</h3>
	<p class="cart-item-price">{{ good.price }}</p>
	<button type="button" class="delete-from-cart" :data-index="index" v-on:click="decrementItemCart">-</button>
	<span class="cart-quantity">[{{ good.quantity }}]</span>
	<button type="button" class="add-to-cart" :data-index="index" v-on:click="incrementItemCart">+</button>
	</div>`,
	props: ['good', 'index'],
	methods: {
		incrementItemCart(event) {
			myModule.emit('addItemToBasket', event);
		},

		decrementItemCart(event) {
			myModule.emit('deleteItemFromBasket', event);
		}
	}
});

Vue.component('error', {
	template: `<div class="error">
	<h2 class="error-text">ОШИБКА</h2>
	</div>`,

	props: ['errorRequest']
});

// Компонент поиска
Vue.component('search', {
	template: `<div class="search-block">
	<input type="search" id="search-input" v-model="app.search">
	<button type="button" class="search" v-on:click="app.searchHandler">Искать</button>
	</div>`,
	props: [],
});