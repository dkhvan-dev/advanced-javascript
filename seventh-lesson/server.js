// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');

// const app = express();

// app.use(express.static('.'));
// app.use(bodyParser.json());

// // Get-запрос на получение информации о товарах
// app.get('/catalog', (req, res) => {
// 	fs.readFile('base.json', 'utf-8', (err, data) => {
// 		res.send(data);
// 	});
// });

// // Get-запрос на получение информации о корзине
// app.get('/cart', (req, res) => {
// 	fs.readFile('cart.json', 'utf-8', (err, data) => {
// 		res.send(data);
// 	});
// });

// // Post-запрос на получение информации о корзине
// app.post('/addToCart', (req, res) => {
// 	fs.readFile('cart.json', 'utf-8', (err, data) => {
// 		if(err) {
// 			res.send('{"result": 0}');
// 		}
// 		const cart = JSON.parse(data);
// 		const item = req.body;
// 		cart.push(item);
// 		fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
// 			if(err) {
// 					res.send('{"result": 0}');
// 			} else {
// 					res.send('{"result": 1}');
// 			}
// 		});
// 	});
// });

// app.listen(3000, function() {
// 	console.log('Сервер запущен');
// });

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(express.static('.'));
app.use(bodyParser.json());

// Get-запрос на получение информации о товарах
app.get('/catalog', (req, res) => {
	fs.readFile('base.json', 'utf-8', (err, data) => {
		res.send(data);
	});
});

// Get-запрос на получение информации о корзине
app.get('/cart', (req, res) => {
	fs.readFile('cart.json', 'utf-8', (err, data) => {
		res.send(data);
	});
});

// Post-запрос на получение информации о корзине (Добавление товара в корзину из каталога)
app.post('/addToCart', (req, res) => {
	fs.readFile('cart.json', 'utf-8', (err, data) => {
		if(err) {
			res.send('{"result": 0}');
		}
		const cart = JSON.parse(data);
		const item = req.body;
		cart.push(item);
		fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
			if(err) {
					res.send('{"result": 0}');
			} else {
					res.send('{"result": 1}');
			}
		});
	});
});

// Post-запрос на получение информации о корзине (Удаление или увеличение количества товара в корзине)
app.post('/updateCart', (req, res) => {
	fs.readFile('cart.json', 'utf-8', (err, data) => {
		if(err) {
			res.send('{"result": 0}');
		}
		const cart = req.body;
		fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
			if(err) {
					res.send('{"result": 0}');
			} else {
					res.send('{"result": 1}');
			}
		});
	});
});

// В разработке
app.post('/userActions', (req, res) => {
	
});

app.listen(3000, function() {
	console.log('Сервер запущен');
});