document.addEventListener("DOMContentLoaded", () => {
   const convert = document.querySelector('#convert');
   convert.disabled = true;
   const input = document.querySelector("#currency");
   const result = document.querySelector('#result');

   // Enabling convert button and clearing result on input
   input.onkeyup = () => {
      if (input.value.length > 0) {
         convert.disabled = false;
      } else {
         convert.disabled = true;
      }
   };

   // Clear result when user starts typing
   input.addEventListener('input', () => {
      result.innerHTML = '';
   });

   document.querySelector('form').onsubmit = function() {
      fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json")
         .then(response => {
            if (!response.ok) {
               throw new Error('Network response was not ok');
            }
            return response.json();
         })
         .then(data => {
            const currency = input.value.toLowerCase();
            const rate = data.eur[currency];
            if (rate !== undefined) {
               result.innerHTML = `1 euro is equal to ${rate.toFixed(3)} ${currency.toUpperCase()}`;
            } else {
               result.innerHTML = "Invalid currency! Try again.";
            }
         })
         .catch(error => {
            result.innerHTML = `Error: ${error.message}`;
         });

      return false; // Prevent form from submitting
   };
});