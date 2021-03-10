class ComponentList {
		constructor() {
			this.sizes = [
				{ruName: 'Маленький', enName: 'Small', cost: 50, kkal: 20,},
				{ruName: 'Большой', enName: 'Big', cost: 100, kkal: 40,}
			];

			this.filles = [
				{ruName: 'С сыром', enName: 'Cheese', cost: 10, kkal: 20,},
				{ruName: 'С салатом', enName: 'Salad', cost: 20, kkal: 50,},
				{ruName: 'С картофелем', enName: 'Potato', cost: 15, kkal: 10,},
			];

			this.additions = [
				{ruName: 'Приправа', enName: 'Spice', cost: 15, kkal: 0,},
				{ruName: 'Майонез', enName: 'Mayonnaise', cost: 20, kkal: 5,},
			];

			this.CreateBurger();
		}

		CreateBurger() {
			const sizeSelect = document.querySelector('#size');
			const sizeSelectHTML = this.sizes.reduce((sum, item) => {
				return sum + ` <option value="${item.enName}">${item.ruName}</option>`;
			}, '');

			sizeSelect.innerHTML = sizeSelectHTML;
			sizeSelect.firstElementChild.checked = true;

			const fillSelect = document.querySelector('#fill');
			const fillSelectHTML = this.filles.reduce((sum, item) => {
				return sum + ` <div class="form-check"><input class="form-check-input" type="checkbox" id="${item.enName}"><label class="form-check-label" for="${item.enName}">${item.ruName}</label></div>`;
			}, '');

			fillSelect.innerHTML = fillSelectHTML;

			const additionsSelect = document.querySelector('#additions');
			const additionsSelectHTML = this.additions.reduce((sum, item) => {
				return sum + ` <div class="form-check"><input class="form-check-input" type="checkbox" id="${item.enName}"><label class="form-check-label" for="${item.enName}">${item.ruName}</label></div>`;
			}, '');

			additionsSelect.innerHTML = additionsSelectHTML;
		}
}

class Hamburger {
	constructor(componentList) {
		this.size = '';
		this.filles = [];
		this.additions = [];
		this.componentList = componentList;
	}

	calcParam() {
		let result = {cost: 0, kkal: 0};

		this.componentList.sizes.forEach(el => {
			if (el.enName === this.size) {
				result.cost += el.cost;
				result.kkal += el.kkal;
			}
		});

		this.componentList.filles.forEach(el => {
			this.filles.forEach(item => {
				if (el.enName === item) {
					result.cost += el.cost;
					result.kkal += el.kkal;
				}
			})
		});

		this.componentList.additions.forEach(el => {
			this.additions.forEach(item => {
				if (el.enName === item) {
					result.cost += el.cost;
					result.kkal += el.kkal;
				}
			})
		});
		return result;
	}

	screen() {
		const myHamburger = this.calcParam();

		document.querySelector('#burger-cost').innerHTML = myHamburger.cost;
		document.querySelector('#burger-kkal').innerHTML = myHamburger.kkal;
	}

	setDataFromDOM() {
		this.size = document.querySelector('#size').value;

		let inputFill = [];
		const fillForm = document.querySelector('#fill');
		const fillInputs = fillForm.querySelectorAll('.form-check-input');

		fillInputs.forEach(el => {
			if (el.checked) inputFill.push(el.id);
		});
		this.filles = inputFill;

		let inputAdditions = [];
		const additionsForm = document.querySelector('#additions');
		const additionsInputs = additionsForm.querySelectorAll('.form-check-input');

		additionsInputs.forEach(el => {
			if (el.checked) inputAdditions.push(el.id);
		});
		this.additions = inputAdditions;

		this.screen();
	}

}

window.addEventListener('DOMContentLoaded', () => {
	const componentList = new ComponentList();
	const hamburger = new Hamburger(componentList);

	hamburger.setDataFromDOM();

	document.addEventListener('input', () => {
		hamburger.setDataFromDOM();
	});
});