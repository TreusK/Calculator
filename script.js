'use strict'

function divide(n1, n2) {
	return (n2 == 0) ? 'Error' : n1 / n2;
}

function operate(operator, n1, n2) {
	switch (operator) {
		case '+' :  return n1+n2;
		   break;
		case '-' : return n1-n2;
		   break;
		case '*' : return n1*n2;
		   break;
		case '/' : return divide(n1, n2);
		   break;
	};
}

let regex = /[+*\/-]/g;
let display = document.querySelector('#truDisplay');
const buttons = document.querySelectorAll('.button');
const numbers = document.querySelectorAll('.number');
let num1; 
let num2;
let oper;

for (let elem of buttons) {
	elem.addEventListener('click', function() {
		let str = display.innerText;
		//if a number was pressed, and the line isn't too long
	    if (elem.classList.contains('number') && str.length < 13 && display.innerText != 'Error') {
			display.innerText += elem.innerText; 
		};
		//if an operator is pressed, and the display wasn't empty
		if (elem.classList.contains('operator') && str != '' && display.innerText != 'Error') {
			//if it has no operator, adds one
			if (str.match(regex) == null) {
				num1 = +display.innerText;
				oper = elem.id;
				display.innerText += ' ' + elem.innerText;
			};
		};
		//delete buttons
		if (elem.classList.contains('delete')) {
			if (elem.innerText == 'C') {
				display.innerText = '';
			} else {
				display.innerText = display.innerText.slice(0, display.innerText.length-1);
			};
		};
		//if equal is pressed
		if (elem.id == 'equal') {
			//has 1 operator and last element is a number
			if (regex.test(str) && /[0-9]$/.test(str)){
				num2 = +str.slice(str.indexOf(' ') +2);
				display.innerText = operate(oper, num1, num2);
			}
		};
		//dot button
		if (elem.id == 'dot' && str != '' && display.innerText != 'Error' && /[0-9]$/.test(str)) {
			display.innerText += elem.innerText;
		}
    });
};

//keyboard buttons
const event = new Event('click');
const arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '*', '/', '.', 'Enter'];
let htmlElement = '';
let condition = true;
let operatorElement;

document.addEventListener('keydown', function(e){
	if (arr.includes(e.key)){
		if (arr.indexOf(e.key) < 10) {
			condition = true;
			htmlElement = 'n' + e.key;
		} else if (arr.indexOf(e.key) >= 10 && arr.indexOf(e.key) <= 13) {
			condition = false;
			htmlElement = e.key;
		} else if (e.key == '.') {
			condition = true;
			htmlElement = 'dot';
		} else {
			condition = true;
			htmlElement = 'equal';
		};
		
		if (condition) {
			let element = document.querySelector('#' + htmlElement);
			element.dispatchEvent(event);
		} else {
			switch (e.key) {
				case '+' : operatorElement = document.querySelector('.add');
				   break;
				case '-' : operatorElement = document.querySelector('.substract');
				   break;
				case '*' : operatorElement = document.querySelector('.multiply');
				   break;
				case '/' : operatorElement = document.querySelector('.divide');
				   break;
			};
			operatorElement.dispatchEvent(event);
		};
	};
});





























