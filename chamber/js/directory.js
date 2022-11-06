const cards = document.querySelector('.cards');

fetch('./data/data.json')
  .then((response) => response.json())
  .then(function (jsonObject) {
    console.log(jsonObject); // temporary checking for valid response and data parsing
    const directory = jsonObject['business'];
    directory.forEach((dir) => displayDirectory(dir));
  });

// Function to add ordinal suffix to numbers
function nth(n) {
  return ['st', 'nd', 'rd'][((((n + 90) % 100) - 10) % 10) - 1] || 'th';
}

function displayDirectory(dir) {
  // Create elements to add to the document
  let card = document.createElement('section');
  let h2 = document.createElement('h2');
  let address = document.createElement('p');
  let phoneNumber = document.createElement('p');
  // let portrait = document.createElement('img');

  // Change the textContent property of the h2 element to contain the prophet's full name
  if (h2) h2.textContent = dir.name;
  if (address) address.textContent = `Address: ${dir.address}`;
  if (phoneNumber) phoneNumber.textContent = `Contact: ${dir.contact}`;

  // Build the image attributes by using the setAttribute method for the src, alt, and loading attribute values. (Fill in the blank with the appropriate variable).
  // portrait.setAttribute('src', prophet.imageurl);
  // portrait.setAttribute(
  //   'alt',
  //   `Portait of ${prophet.name} ${prophet.lastname} - ${prophet.order}${nth(
  //     prophet.order
  //   )} Latter-day President`
  // );
  // portrait.setAttribute('loading', 'lazy');

  // Add/append the section(card) with the h2 element
  card.appendChild(h2);
  card.appendChild(address);
  card.appendChild(phoneNumber);
  // card.appendChild(portrait);

  // Add/append the existing HTML div with the cards class with the section(card)
  document.querySelector('div.cards').appendChild(card);
}
