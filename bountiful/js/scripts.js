const currentDate = new Intl.DateTimeFormat('en-UK', {
  dateStyle: 'full',
}).format(new Date());

// Locally store date of last visit
window.localStorage.setItem('lastVisit', currentDate);

// Retrieve last visit date from local storage
const lastVisitDate = localStorage.getItem('lastVisit');

const date1 = new Date();
const date2 = new Date(lastVisitDate);

// Calculate days between last visit
const days = (date1, date2) => {
  let difference = date1.getTime() - date2.getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
  return TotalDays;
};

const daysLastVisitText = () => {
  const dayDiff = days(date1, date2);
  return `${dayDiff} ${dayDiff > 1 ? 'days' : 'day'}`;
};

const displayLastVisit = daysLastVisitText();

const lastVisitSelector = document.querySelector('#lastVisit');
if (lastVisitSelector) lastVisitSelector.innerHTML = displayLastVisit;

const currentDateSelector = document.querySelector('#currentDate');
if (currentDateSelector) currentDateSelector.innerHTML = currentDate;

// Hamburger button toggle menu
function toggleMenu() {
  const primaryNavElement = document.getElementById('primaryNav');
  if (primaryNavElement) primaryNavElement.classList.toggle('open');

  const hamburgerBtnElement = document.getElementById('hamburgerBtn');
  if (hamburgerBtnElement) hamburgerBtnElement.classList.toggle('open');
}

const menuButton = document.getElementById('hamburgerBtn');
if (menuButton) menuButton.onclick = toggleMenu;

const startElement = document.getElementById('start');
if (startElement) {
  startElement.onclick = function () {
    location.href = 'https://norre-daroy.github.io/wdd230/bountiful/fresh.html';
  };
}

//Value of hidden input
const inputDateTimeSelector = document.getElementById('dateTime');
if (inputDateTimeSelector) inputDateTimeSelector.value = new Date();

// Last modified
const dateTimeLastModified = `Last modification: ${document.lastModified}`;
const year = new Date(document.lastModified).getFullYear();

const yearSelector = document.querySelector('#year');
if (yearSelector) yearSelector.innerHTML = year;

const dateSelector = document.querySelector('#date');
if (dateSelector) dateSelector.innerHTML = dateTimeLastModified;

// Lazy loading images
const imagesToLoad = document.querySelectorAll('img[data-src]');

const loadImages = (image) => {
  image.setAttribute('src', image.getAttribute('data-src'));
  image.onload = () => {
    image.removeAttribute('data-src');
  };
};

const imgOptions = {
  threshold: 0.5,
  rootMargin: '0px 0px 50px 0px',
};

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (items, observer) =>
      items.forEach((item) => {
        if (item.isIntersecting) {
          loadImages(item.target);
          observer.unobserve(item.target);
        }
      }),
    imgOptions
  );
  imagesToLoad.forEach((img) => observer.observe(img));
} else {
  imagesToLoad.forEach((img) => loadImages(img));
}

// DIRECTORY
const cards = document.querySelector('.cards');
const getCoastalList = async () => {
  let coastal = [];
  await fetch('./data/coastal.json')
    .then((res) => res.json())
    .then((data) =>
      data.directory.forEach((coastal) => {
        displayCoastal(coastal);
      })
    );

  // Selects 3 random business with gold/silver status
  const randomSpotlight = getMultipleRandom(
    coastal.filter(
      (business) =>
        business.membershipLevel === 'gold' ||
        business.membershipLevel === 'silver'
    ),
    3
  );

  randomSpotlight.forEach((a) => displaySpotlight(a));
};

getCoastalList();

function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

function displayCoastal(coastal) {
  // Create elements to add to the document
  let card = document.createElement('section');
  let div1 = document.createElement('div');
  let div2 = document.createElement('div');
  let image = document.createElement('img');
  let name = document.createElement('h3');
  let description = document.createElement('p');
  let credit = document.createElement('p');

  // Change the textContent property of the h2 element to contain the prophet's full name
  if (name) name.textContent = coastal.name;
  if (description) description.textContent = `${coastal.description}`;
  if (credit) credit.textContent = `${coastal.imgCredits}`;

  // Build the image attributes by using the setAttribute method for the src, alt, and loading attribute values. (Fill in the blank with the appropriate variable).
  image.setAttribute('src', coastal.imgUrl);
  image.setAttribute('alt', `${coastal.name}`);
  image.setAttribute('loading', 'lazy');

  // Add/append the section(card) with the h2 element
  div1.appendChild(image);
  // div1.appendChild(credit);
  div2.appendChild(name);
  div2.appendChild(description);

  card.appendChild(div1);
  card.appendChild(div2);

  // Add/append the existing HTML div with the cards class with the section(card)
  const divGrid = document.querySelector('#coastal');
  if (divGrid) divGrid.appendChild(card);
}

const display = document.querySelector('#coastal');

// Get fruits
const fruits = [];
const selectFruits = async (id) => {
  let fruitOptions = document.getElementById(id);
  fruitOptions.length = 0;

  let defaultOption = document.createElement('option');
  defaultOption.text = 'Select fruit';

  fruitOptions.add(defaultOption);
  fruitOptions.selectedIndex = 0;

  const url = 'https://brotherblazzard.github.io/canvas-content/fruit.json';

  await fetch(url)
    .then(function (response) {
      if (response.status !== 200) {
        console.warn(
          'Looks like there was a problem. Status Code: ' + response.status
        );
        return;
      }

      // Examine the text in the response
      response.json().then(function (data) {
        let option;
        data.map((d) => fruits.push(d));

        for (let i = 0; i < data.length; i++) {
          option = document.createElement('option');
          option.text = data[i].name;
          option.value = data[i].name;
          fruitOptions.add(option);
        }
      });
    })
    .catch(function (err) {
      console.error('Fetch Error -', err);
    });
};

function getFruitDetails() {
  const inputDate = localStorage.getItem('dateTime');
  const inputFirstname = localStorage.getItem('fname');
  const inputEmail = localStorage.getItem('email');
  const inputPhone = localStorage.getItem('phone');
  const selectedFruit1 = localStorage.getItem('fruits1');
  const selectedFruit2 = localStorage.getItem('fruits2');
  const selectedFruit3 = localStorage.getItem('fruits3');
  const inputInstructions = localStorage.getItem('instructions');

  let orderDate = document.getElementById('formDate');
  let firstName = document.getElementById('formName');
  let email = document.getElementById('formEmail');
  let phone = document.getElementById('formPhone');
  let selectFruits = document.getElementById('formFruit');
  let instructions = document.getElementById('formInstructions');

  // Change the textContent property of the h2 element to contain the prophet's full name
  const inputDateFormatted = new Intl.DateTimeFormat('en-UK', {
    dateStyle: 'full',
  }).format(new Date(inputDate));

  if (orderDate) orderDate.textContent = `Order date: ${inputDateFormatted}`;
  if (firstName) firstName.textContent = `Firstname: ${inputFirstname}`;
  if (email) email.textContent = `Email: ${inputEmail}`;
  if (phone) phone.textContent = `Phone: ${inputPhone}`;
  if (selectFruits)
    selectFruits.textContent = `Fruit: ${selectedFruit1}, ${selectedFruit2}, ${selectedFruit3}`;
  if (instructions)
    instructions.textContent = `Special instructions: ${inputInstructions}`;

  const div = document.querySelector('#freshDrinks');
  div.appendChild(orderDate);
  div.appendChild(firstName);
  div.appendChild(email);
  div.appendChild(phone);
  div.appendChild(selectFruits);
  div.appendChild(instructions);

  console.log(selectedFruit1);

  fruits.forEach((fruit) => {
    fruit.name === selectedFruit1;
  });
  // console.log(fruitDetails);
}

selectFruits('fruits1');
selectFruits('fruits2');
selectFruits('fruits3');

const form = document.querySelector('#fresh');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  for (const pair of formData.entries()) {
    localStorage.setItem(pair[0], pair[1]);
  }

  getFruitDetails();
});

function displayHomeFruits() {
  const inputDate = localStorage.getItem('dateTime');
  const inputFirstname = localStorage.getItem('fname');
  const inputEmail = localStorage.getItem('email');
  const inputPhone = localStorage.getItem('phone');
  const selectedFruit1 = localStorage.getItem('fruits1');
  const selectedFruit2 = localStorage.getItem('fruits2');
  const selectedFruit3 = localStorage.getItem('fruits3');
  const inputInstructions = localStorage.getItem('instructions');

  let orderDate = document.getElementById('formDate');
  let firstName = document.getElementById('formName');
  let email = document.getElementById('formEmail');
  let phone = document.getElementById('formPhone');
  let selectFruits = document.getElementById('formFruit');
  let instructions = document.getElementById('formInstructions');

  // Change the textContent property of the h2 element to contain the prophet's full name
  const inputDateFormatted = new Intl.DateTimeFormat('en-UK', {
    dateStyle: 'full',
  }).format(new Date(inputDate));

  if (orderDate) orderDate.textContent = `Order date: ${inputDateFormatted}`;
  if (firstName) firstName.textContent = `Firstname: ${inputFirstname}`;
  if (email) email.textContent = `Email: ${inputEmail}`;
  if (phone) phone.textContent = `Phone: ${inputPhone}`;
  if (selectFruits)
    selectFruits.textContent = `Fruit: ${selectedFruit1}, ${selectedFruit2}, ${selectedFruit3}`;
  if (instructions)
    instructions.textContent = `Special instructions: ${inputInstructions}`;

  const div2 = document.querySelector('#freshDrinksHome');
  div2.appendChild(orderDate);
  div2.appendChild(firstName);
  div2.appendChild(email);
  div2.appendChild(phone);
  div2.appendChild(selectFruits);
  div2.appendChild(instructions);

  const fruitDetails = fruits.find((fruit) => fruit.name === selectedFruit1);
}
