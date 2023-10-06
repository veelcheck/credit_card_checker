This started as a *Codecademy* project where you could check if a single number or batches of numbers are valid.
I've decided to stick to individual numbers and added some simple HTML and CSS for it to look nice.

# JavaScript: 

* If the number is not valid, it informs the user it is so and returns a valid one.
* If the number is valid, it informs the user it is so and shows a logo of a company that allegedly issued the card (Visa, MasterCard, Maestro, Diners Club American Express or Unkonwn).
* The input is restricted to numbers by HTML, still signs like comma or dash are passed through. JS checks if the input is numbers only and displays a warning if it is not.
* It makes sure the input has a required length - if not, the waring is displayed to the user.
* Anything displayed to the user vanishes after a given time (setTimeout) or when the new number is provided.
* You can both press Enter or the button to start the validation.
 
**Disclaimer:**  
When you enter a Diners Club card number issued for North America, you will get a MasterCard logo. That is because they start with the same digits and have the same length. To distinguish between them I would have to dig deeper into users accounts which I decided against. Diners Club and MasterCard are somehow connected anyway - so it is not a bug :bug: it is a feature :wink:
