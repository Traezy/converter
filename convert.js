console.log('triton');

// const convertButton = document.getElementById('convertButton');
const resultElement = document.getElementById('result');
const tokenDropdown1 = document.getElementById('tokenDropdown1');
const tokenDropdown2 = document.getElementById('tokenDropdown2');

// Function to fetch token data from api.json
const fetchTokenData = () => {
  const selectedToken1 = tokenDropdown1.value;
  const selectedToken2 = tokenDropdown2.value;

  fetch('api.json')
    .then((response) => response.json())
    .then((jsonData) => {
      const foundToken1 = jsonData.find(
        (token) =>
          token.symbol.toLowerCase() === selectedToken1.toLowerCase() ||
          token.name.toLowerCase() === selectedToken1.toLowerCase()
      );
      const foundToken2 = jsonData.find(
        (token) =>
          token.symbol.toLowerCase() === selectedToken2.toLowerCase() ||
          token.name.toLowerCase() === selectedToken2.toLowerCase()
      );

      if (foundToken1 && foundToken2) {
        const conversionRate = foundToken1.price / foundToken2.price;
        const resultText = `1 $${foundToken1.symbol} = ${conversionRate.toFixed(
          8
        )} $${foundToken2.symbol}`;
        resultElement.textContent = resultText;
      } else {
        resultElement.textContent = `Token not found in the database.`;
      }
    })
    .catch((error) => {
      console.error('Error fetching JSON:', error);
    });
};

// Populate the dropdowns with tokens from api.json
fetch('api.json')
  .then((response) => response.json())
  .then((jsonData) => {
    jsonData.forEach((token) => {
      const option1 = document.createElement('option');
      option1.value = token.symbol;
      option1.textContent = token.name;
      tokenDropdown1.appendChild(option1);

      const option2 = document.createElement('option');
      option2.value = token.symbol;
      option2.textContent = token.name;
      tokenDropdown2.appendChild(option2);
    });
  })
  .catch((error) => {
    console.error('Error fetching JSON for dropdowns:', error);
  });
// Event listeners
// convertButton.addEventListener('click', () => {
//   fetchTokenData();
// });

tokenDropdown1.addEventListener('change', () => {
  fetchTokenData();
});

tokenDropdown2.addEventListener('change', () => {
  fetchTokenData();
});
