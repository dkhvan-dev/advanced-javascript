"use strict";

// Задание №1
// let textareaFirst = document.querySelector('.start-text');
// let textareaSecond = document.querySelector('.end-text');
// let btn = document.querySelector('button');
// const regexp = /'/g;

// btn.addEventListener('click', () => {
// 	textareaSecond.value = textareaFirst.value.replace(regexp, '"');
// });

// Задание №2

// let textareaFirst = document.querySelector('.start-text');
// let textareaSecond = document.querySelector('.end-text');
// let btn = document.querySelector('button');
// const regexp = /'/gim;
// const regexpReturnApostroph = /\b\"\b/gim;

// btn.addEventListener('click', () => {
// 	let newVar = textareaFirst.value.replace(regexp, '"');
// 	textareaSecond.value = newVar.replace(regexpReturnApostroph, '\'');
// });

// Задание №3

let nameInput = document.querySelector('.name');
let telInput = document.querySelector('.tel');
let emailInput = document.querySelector('.email');

let errorName = document.querySelector('.error-name');
let errorTel = document.querySelector('.error-tel');
let errorEmail = document.querySelector('.error-email');

let btn = document.querySelector('button');

btn.addEventListener('click', () => {
	const regexpName = /[a-zA-Z]/gi;
	const regexpTel = /\+7[0-9]{10}/g;
	const regexpEmail = /[a-zA-Z]+(\.|-)*@mail\.ru/gi;

	if (!regexpName.test(nameInput.value)) {
		nameInput.className = "name false_value";
		errorName.style.display = "inline";
	} else {
		nameInput.className = "name true_value";
		errorName.style.display = "none";
	}
	if (!regexpTel.test(telInput.value)) {
		telInput.className = "tel false_value";
		errorTel.style.display = "inline";
	} else {
		telInput.className = "tel true_value";
		errorTel.style.display = "none";
	}
	if (!regexpEmail.test(emailInput.value)) {
		emailInput.className = "email false_value";
		errorEmail.style.display = "inline";
	} else {
		emailInput.className = "email true_value";
		errorEmail.style.display = "none";
	}
});
