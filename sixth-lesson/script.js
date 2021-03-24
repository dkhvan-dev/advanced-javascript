const API_URL = '/base.json';

const vue = new Vue({
	el: '#app',

	data: {
		search: '',
		goods: [],
		filteredGoods: [],
		cart: [],
		isCartOpen: false,
		addGoodPrices: [],
		deletedGoodsFromCart: [],
		totalCost: 0,
		errorRequest: false,
	},

	methods: {
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
			const id = e.target.dataset.id;
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
			e.target.setAttribute("disabled", "disabled");

			this.addGoodPrices.push(itemCart.price);
			this.totalCost=0;
			this.addGoodPrices.forEach((item) => {
				this.totalCost += item;
			});
		},

		// Увеличение количества определенного товара в корзине
		addItemCart(e) {
			const index = e.target.dataset.index;

			this.filteredGoods.forEach((item) => {
				if (this.cart[index].id == item.id) {
					this.cart[index].quantity++;
					this.addGoodPrices.push(item.price);
				}
			});

			this.totalCost=0;
			this.addGoodPrices.forEach((item) => {
				this.totalCost += item;
			});

			console.log('Было ' + this.addGoodPrices);
		},

		// Удаление товара из корзины
		deleteFromCart(e) {
			const index = e.target.dataset.index;
			
			if (this.cart.length == 1) {
				this.cart.splice(index);
				this.totalCost = 0;
			} else {
				this.filteredGoods.forEach((item) => {
					if (this.cart[index].id == item.id) {
						if (this.cart[index].quantity > 1) {
							this.cart[index].quantity--;
							for (let i = this.addGoodPrices.length-1; i>=0; i--) {
								if (this.addGoodPrices[i] == this.cart[index].price) {
									this.addGoodPrices.splice(i, 1);
									break;
								}
							}
						}
						else {
							for (let i = this.addGoodPrices.length-1; i>=0; i--) {
								if (this.addGoodPrices[i] == this.cart[index].price) {
									this.addGoodPrices.splice(i, 1);
									this.cart.splice(index, 1);
									break;
								}
							}
						}
					}

					
				});
	
				this.totalCost = 0;
				this.addGoodPrices.forEach((item) => {
					this.totalCost += item;
				});
			}
			console.log('Стало ' + this.addGoodPrices);
		},

		// Открытие\Закрытие корзины
		openCartHandler() {
			this.isCartOpen = !this.isCartOpen;
		},

		// Запрос на сервер
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
						success(JSON.parse(xhr.responseText));
						this.errorRequest = false;
					} else if (xhr.status > 400) {
						this.errorRequest = true;
						error('Ошибка!');
					}
				}
			}
	
			xhr.open('GET', API_URL, true);
			xhr.send();
		},
	
		fetchPromise() {
			return new Promise((resolve, reject) => {
				this.fetch(reject, resolve);
			});
		}
	},

	mounted() {
		this.fetchPromise() 
			.then(data => {
				this.goods = data;
				this.filteredGoods = data;
			})
			.catch(err => {
				console.log(err);
			});
	}
});

// Компонент поиска
Vue.component('search', {
	template: `<div class="search-block">
	<input type="search" id="search-input" v-model="vue.search">
	<button type="button" class="search" v-on:click="vue.searchHandler">Искать</button>
	</div>`,
	props: [],
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
	<img v-bind:src="good.src">
	<h3>{{ good.title }}</h3>
	<p class="cart-item-price">{{ good.price }}</p>
	<button type="button" class="delete-from-cart" :data-index="index" v-on:click="vue.deleteFromCart">-</button>
	<span class="cart-quantity">[{{ good.quantity }}]</span>
	<button type="button" class="add-to-cart" :data-index="index" v-on:click="vue.addItemCart">+</button>
	</div>`,
	props: ['good', 'index']
});

Vue.component('error', {
	template: `<div class="error">
	<h2 class="error-text">ОШИБКА</h2>
	</div>`,

	props: ['errorRequest']
});