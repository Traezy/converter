// // Get HTML ELEMENTS
// const inputElement = document.getElementById('inCur');
// const outputElement = document.getElementById('outCur');
// const convertButton = document.querySelector('button');
// const resultElement = document.getElementById('result');

// const inputValue = () => {
//   const inputValue = inputElement.value;
//   console.log(inputValue);

//   // Fetch the JSON file as text
//   fetch('api.json')
//     .then((response) => response.text())
//     .then((jsonText) => {
//       // Parse the JSON text into a JavaScript object
//       const jsonData = JSON.parse(jsonText);

//       // Find the object in the JSON data based on the user's input
//       const foundToken = jsonData.find(
//         (token) =>
//           token.symbol.toLowerCase() === inputValue ||
//           token.name.toLowerCase() === inputValue
//       );
//       //  TO console
//       foundToken
//         ? console.log(
//             `${foundToken.symbol}: ${foundToken.price} is No ${
//               jsonData.indexOf(foundToken) + 1
//             } king of DeFi`
//           )
//         : console.log(
//             `Token with symbol or name '${inputValue}' not found in JSON data.`
//           );

//       // TO DOM
//       if (foundToken) {
//         const resultText = `${foundToken.symbol}: $${foundToken.price}`;

//         // Set the result in the resultElement
//         resultElement.textContent = resultText;
//       } else {
//         resultElement.textContent = `Token with symbol or name '${inputValue}' not found in database.`;
//       }
//     })
//     .catch((error) => {
//       console.error('Error fetching JSON:', error);
//     });
// };

// // inputElement.addEventListener('input', () => {
// //   inputValue();
// // });

// convertButton.addEventListener('click', () => {
//   inputValue();
// });

// inputElement.addEventListener('keyup', (event) => {
//   if (event.key === 'Enter') {
//     inputValue();
//   }
// });

console.log('triton');

const inputElement = document.getElementById('tokenInput');
const convertButton = document.getElementById('convertButton');
const resultElement = document.getElementById('result');
const tokenDropdown = document.getElementById('tokenDropdown');
const searchInput = document.getElementById('search');

// Function to fetch token data from api.json
const fetchTokenData = () => {
  const inputValue = inputElement.value.toLowerCase();

  fetch('api.json')
    .then((response) => response.json())
    .then((jsonData) => {
      const foundToken = jsonData.find(
        (token) =>
          token.symbol.toLowerCase() === inputValue ||
          token.name.toLowerCase() === inputValue
      );

      if (foundToken) {
        const resultText = `${foundToken.symbol}: $${foundToken.price}`;
        resultElement.textContent = resultText;
      } else {
        resultElement.textContent = `Token with symbol or name '${inputValue}' not found in database.`;
      }
    })
    .catch((error) => {
      console.error('Error fetching JSON:', error);
    });
};

// Populate the dropdown with tokens from api.json
fetch('api.json')
  .then((response) => response.json())
  .then((jsonData) => {
    jsonData.forEach((token) => {
      const option = document.createElement('option');
      option.value = token.symbol;
      option.textContent = token.name;
      tokenDropdown.appendChild(option);
    });
  })
  .catch((error) => {
    console.error('Error fetching JSON for dropdown:', error);
  });

searchInput.addEventListener('input', function () {
  const searchTerm = searchInput.value.toLowerCase();

  for (let option of tokenDropdown.options) {
    if (option.value.toLowerCase().includes(searchTerm)) {
      option.style.display = 'block';
    } else {
      option.style.display = 'none';
    }
  }
});

// Event listeners
convertButton.addEventListener('click', () => {
  fetchTokenData();
});

inputElement.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    fetchTokenData();
  }
});

tokenDropdown.addEventListener('change', () => {
  inputElement.value = tokenDropdown.value;
  fetchTokenData();
});
