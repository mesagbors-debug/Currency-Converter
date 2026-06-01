const converterForm = document.getElementById("converter-form");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");
const errorDiv = document.getElementById("error");
const convertBtn = document.getElementById("convertBtn");

let rates = {};
const apiUrl = "https://api.exchangerate-api.com/v4/latest/USD";
window.addEventListener("load", fetchCurrencies);
converterForm.addEventListener("submit", convertCurrency);
convertBtn.addEventListener("click", convertCurrency);

async function fetchCurrencies() {
  const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
  const data = await response.json();

  rates = data.rates;

  const currencyOptions = Object.keys(rates);

  currencyOptions.forEach((currency) => {
    const option1 = document.createElement("option");
    option1.value = currency;
    option1.textContent = currency;
    fromCurrency.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = currency;
    option2.textContent = currency;
    toCurrency.appendChild(option2);
  });
}

function convertCurrency(e) {
  e.preventDefault();

  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount)) {
    resultDiv.textContent = "Please enter a valid number.";
    return;
  }

  const usdValue = amount / rates[from];
  const converted = usdValue * rates[to];

  resultDiv.textContent = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
}
