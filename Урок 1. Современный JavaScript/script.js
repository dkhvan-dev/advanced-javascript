const goods = [
	{title: 'Shirt', price: 150},
	{title: 'Socks', price: 300},
	{title: 'Jacket', price: 450},
	{title: 'Shoes', price: 600},
];

const $goodsList = document.querySelector('.goods-list');

const RenderGoodsItem = ({ title, price }) => {
	return (`<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`);
}

const RenderGoodsList = (list = goods) => {
	let goodsList = list.map(
		item => RenderGoodsItem(item)
	).join('\n');

	$goodsList.insertAdjacentHTML('beforeend', goodsList);
};

RenderGoodsList();

// Задание №2
// Упростить, возможно, можно написав первую функцию внутри второй.

// Задание №3
// Запятые - это стандартный разделитель в браузере, если не указан свой разделитель. Т.е. браузер пытался за нас соединить массив в одну строку, разделив ее элементы запятыми.