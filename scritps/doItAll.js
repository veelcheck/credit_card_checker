import { displayValid, displayInvalid, displayWarning, displayWarningLength, inputElement  } from "../main.js";
import { modulo10, totalValue, numberCheck, validateCred, makeItValid, checkCompany, company, allDigitsArray, newTotal } from "./helper.js"; 

export let validTimeoutId;
export let invalidTimeoutId;
export let warningNumTimeoutId;
export let warningLengthTimeoutId





export function doItAll(input) {
  input = inputElement.value;
  const inputInteger = Number(input); //To make sure the input is only numbers.

  if (!inputInteger) {
    displayWarning.style.display = "block";
    displayWarning.innerHTML = `Check again.<br> Your input is not a number.`;
    displayInvalid.style.display = "none";
    displayValid.style.display = "none";
    displayWarningLength.style.display = 'none';
    warningNumTimeoutId = setTimeout(() => {
      displayWarning.style.display = 'none';
      inputElement.value = null;
  }, 4000);
    return;
  } 

  if (input.length < 13 || input.length > 19) {
    displayWarningLength.style.display = "block";
    displayWarningLength.innerHTML = `No, no, no, no.<br>Enter between 13 and 19 characters, please.`;
    displayWarning.style.display = 'none';
    displayInvalid.style.display = "none";
    displayValid.style.display = "none";
    warningLengthTimeoutId = setTimeout(() => {
      displayWarningLength.style.display = 'none';
      inputElement.value = null;
  }, 4000);
    return;
  }
  
  input = String(input).split('').map((input
  ) => { return Number(input) });

  checkCompany(input);
  
  displayValid.style.display = "block";
  displayInvalid.style.display = "block";

  clearTimeout(validTimeoutId);
  clearTimeout(invalidTimeoutId);
  clearTimeout(warningNumTimeoutId);
  clearTimeout(warningLengthTimeoutId);  

  if (!validateCred(input)) { 
    
    makeItValid(input);

    displayInvalid.innerHTML = `This number is not valid.<br>Try this ${newTotal}.`;
    displayValid.style.display = "none";
    displayWarning.style.display = 'none';
    displayWarningLength.style.display = 'none';
    invalidTimeoutId = setTimeout(() => {
          displayInvalid.style.display = 'none';
          inputElement.value = null;
      }, 9000); 

  } else {
    
      displayValid.innerHTML = `<img src="images/${company}.png">Good. This number is valid.<br>Happy shopping!`;
      displayInvalid.style.display = "none";
      displayWarning.style.display = 'none';
      displayWarningLength.style.display = 'none';
      validTimeoutId = setTimeout(function() {
            displayValid.style.display = "none";
            inputElement.value = null;
        }, 9000);
    }
}