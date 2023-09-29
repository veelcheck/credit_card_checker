export let company;
export let allDigitsArray;
export let newTotal;

// Checks if the summed up numbers devided by 10 give 0. Helps with validateCard().
export function modulo10(num) {
  if (num % 10 === 0) {
    return true;
  } else {
    return false;
  }
}

// Sums up checked and doubled digits. Helps with validateCard() and makeItValid().
export function totalValue(array) {
  let total = 0;
  array.forEach(num => {
    total +=num;
  });
  return total;
}

// Takes an array of numbers, doubles every second number starting from the end, and substracts 9 if the doubled digit is greater than 9.
//Helps with makeItValid() and validateCred().
export function numberCheck(array) {
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

// Saves and returns a total value as a const with modulo10() on it.
export function validateCred(array) {
  numberCheck(array);

  const checkWithModulo = modulo10((totalValue(allDigitsArray)));
  return checkWithModulo;
  
}

// Rounds the total value down (i.e. 72 to 70, 69 to 60) and calculates the difference.
// Alternetes the last digit and pushes it back to place.
export function makeItValid(array) {
  numberCheck(array);
  const sumedArray = totalValue(allDigitsArray);
  let roundUp = Math.floor(sumedArray / 10) * 10;

  let dif = sumedArray - roundUp;
  let lastDigit = array.pop();
  
  if (lastDigit === 0) {
    lastDigit = 10 - dif;
    array.push(lastDigit);
    newTotal = array.join('');
    return;
  }

  if (lastDigit < dif) {
    lastDigit = (lastDigit + 10) - dif; 
    array.push(lastDigit);
    newTotal = array.join(''); 
  } else {
    lastDigit = lastDigit - dif;
    array.push(lastDigit);
    newTotal = array.join(''); 
  }
}

// Returs a company that "issued" the card: Visa, MasterCard, AmeericanExpress, Maestro, DinersClub, Unknown.
export function checkCompany (num) {
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
    company = 'Unknown';
  }

  return company;
}