const API_URL = '/base.json';

const vue = new Vue({
	el: '#app',

	data: {
		search: '',
		goods: [],
		filteredGoods: [],
		cart: [],
		isCartOpen: false
	},

	methods: {
		searchHandler() {
			if (this.search === '') {
				this.filteredGoods = this.goods;
			}
			const regexp = new RegExp(this.search, 'gi');
			this.filteredGoods = this.goods.filter((good) => regexp.test(good.title));
		},

		addToCart(e) {
			const index = e.target.dataset.index;
			this.cart.push(this.filteredGoods[index]);
		},

		deleteFromCart(e) {
			const index = e.target.dataset.index;
			this.cart.splice(index, 1);
		},

		openCartHandler() {
			this.isCartOpen = !this.isCartOpen;
		},

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
					} else if (xhr.status > 400) {
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
			})
	}
});