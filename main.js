const rates = {};
const elementUSD = document.querySelector('[data-value="USD"]')
const elementEUR = document.querySelector('[data-value="EUR"]')
const elementKZT = document.querySelector('[data-value="KZT"]')

const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');


async function getCurrencies(){
    const url = 'https://www.cbr-xml-daily.ru/daily_json.js';
    const response = await fetch(url);
    const data = await response.json();
    const result = await data;

    rates.USD = result.Valute.USD;
    rates.EUR = result.Valute.EUR;
    rates.KZT = result.Valute.KZT;

    elementUSD.textContent = rates.USD.Value.toFixed(2);
    elementEUR.textContent = rates.EUR.Value.toFixed(2);
    elementKZT.textContent = rates.KZT.Value.toFixed(2);

    if (rates.USD.Value > rates.USD.Previous) {
        elementUSD.classList.add('top');
    } else {
        elementEUR.classList.add('bottom');
    }

    if (rates.EUR.Value > rates.EUR.Previous) {
        elementEUR.classList.add('top');
    } else {
        elementEUR.classList.add('bottom');
    }

    if (rates.KZT.Value > rates.KZT.Previous) {
        elementKZT.classList.add('top');
    } else {
        elementKZT.classList.add('bottom');
    }
}


function convertValue(){
    if (select.value != 'KZT' ) {
        result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2);
    } else {
        result.value = (parseFloat(input.value) * rates[select.value].Value).toFixed(2);
    }
}

input.oninput = convertValue;

select.oninput = convertValue;

getCurrencies();

