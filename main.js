import { doItAll } from "./scritps/doItAll.js";

export const displayValid = document.getElementById('js-return-valid');
export const displayInvalid = document.getElementById('js-return-invalid');
export const displayWarning = document.getElementById('js-warning-not-number');
export const displayWarningLength = document.getElementById('js-warning-not-length');
export const inputElement = document.getElementById('js-userInput');
const buttonElement = document.getElementById('js-button');

let input;

function handleEnter() {
  inputElement.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      doItAll(input);
    } 
  })
}

function handleClick() {
  buttonElement.addEventListener('click', function() {
    doItAll(input);
  })
}

handleEnter();
handleClick();

    