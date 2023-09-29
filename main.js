const displayValid = document.getElementById('js-return-valid');
const displayInvalid = document.getElementById('js-return-invalid');
const displayWarning = document.getElementById('js-warning-not-number');
const displayWarningLength = document.getElementById('js-warning-not-length');
const inputElement = document.getElementById('js-userInput');
const buttonElement = document.getElementById('js-button');

let input;
let validTimeoutId;
let invalidTimeoutId;
let warningNumTimeoutId;
let warningLengthTimeoutId
let newTotal;
let allDigitsArray;
let company;

function doItAll(input) {
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
    
 
    // Checks if the summed up numbers devided by 10 give 0.
    function modulo10(num) {
      if (num % 10 === 0) {
        return true;
      } else {
        return false;
      }
    }

    // Sums up checked and doubled digits.
    function totalValue(array) {
      let total = 0;
      array.forEach(num => {
        total +=num;
      });
      return total;
    }
    
    // Saves and returns a total value as a const with modulo10() on it.

    function validateCred(array) {

      numberCheck(array);

      const checkWithModulo = modulo10((totalValue(allDigitsArray)));
      return checkWithModulo;
      
    };

    // Rounds the total value up to 10, then depending on the differnce rounds it up or down. 
    // Takes the last digit from the array - difference, pushes the adjusted digit back into place.
    function makeItValid(array) {

      numberCheck(array);
      const sumedArray = totalValue(allDigitsArray);
      console.log(sumedArray);

      
   
      let roundUp = Math.floor(sumedArray / 10) * 10;
      console.log(`this is up ${roundUp}`);

      
      let dif = sumedArray - roundUp;
      console.log(dif);
      let lastDigit = array.pop();
      console.log(`this is last digit ${lastDigit}`)
      

      if (lastDigit === 0) {
        lastDigit = 10 - dif;
        array.push(lastDigit);
        newTotal = array.join('');
        return;
      }
 
      if (lastDigit < dif) {
        lastDigit = (lastDigit + 10) - dif;
        console.log(lastDigit);
        array.push(lastDigit);
        newTotal = array.join(''); 
      } else {
        lastDigit = lastDigit - dif;
        array.push(lastDigit);
        newTotal = array.join(''); 
      }
    }
    

    // Takes an array of numbers, doubles every second number starting from the end, and substracts 9 if the doubled digit is greater than 9.

    function numberCheck(array) {
      const checkedDigitArray = [];
      const doubledArray = [];

      for (let i = array.length - 1; i >= 0; i-= 2) {
        const checkedDigit = array[i];
        checkedDigitArray.push(checkedDigit);
      }

      for (let i = array.length - 2; i >= 0; i-= 2) {
        const everyOtherDigit = array[i];
        let makeItDouble = everyOtherDigit * 2;
          if (makeItDouble > 9) {
            makeItDouble -= 9;
          }
        doubledArray.push(makeItDouble);
      }
      
       allDigitsArray = checkedDigitArray.concat(doubledArray);
       return allDigitsArray;
    }

    handleEnter();
    handleClick();

    function checkCompany (num) {
      const twoDigits = num.slice(0, 2).join('');
      const fourDigits = num.slice(0, 4).join('');
      const threeDigits = Number(num.slice(0, 3).join(''));
      
      if (num[0] === 4 && (num.length === 13 || num.length === 16 || num.length === 19)) {
        company = 'Visa';
        
      } else if ((twoDigits >= '51' && twoDigits <= '55') && num.length === 16) {
        company = 'MasterCard';
        
      } else if ((twoDigits === '34' || twoDigits === '37') && num.length === 15) {
        company = 'AmericanExpress';
        
      } else if ((fourDigits === '5018' || fourDigits === '5020' || fourDigits === '5038' || fourDigits === '5893' || fourDigits === '6304' || fourDigits === '6759' || fourDigits === '6761' || fourDigits === '6762' || fourDigits === '6763') && (num.length >= 16 && num.length <= 19)) {
        company = 'Maestro';
        
      } else if (twoDigits === '36' &&  num.length === 14 || ((threeDigits === '300' || threeDigits === '301' || threeDigits === '302' || threeDigits === '303' || threeDigits === '304' || threeDigits === '305') && num.length === 14)) {
        company = 'DinersClub';
      } else {
        company = 'Question';
      }

      return company;
    }
