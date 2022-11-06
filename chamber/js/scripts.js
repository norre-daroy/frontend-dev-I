const currentDate = new Intl.DateTimeFormat('en-UK', {
  dateStyle: 'full',
}).format(new Date());

// // Locally store date of last visit
window.localStorage.setItem('lastVisit', currentDate);

// // Retrieve last visit date from local storage
const lastVisitDate = localStorage.getItem('lastVisit');

const date1 = new Date();
const date2 = new Date(lastVisitDate);

// // Calculate days between last visit
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

const joinElement = document.getElementById('join');
if (joinElement) {
  joinElement.onclick = function () {
    location.href = 'https://norre-daroy.github.io/wdd230/chamber/join.html';
  };
}

//Value of hidden input
const inputDateTimeSelector = document.getElementById('dateTime');
if (inputDateTimeSelector) inputDateTimeSelector.value = new Date();

//Date
const currDate = new Date();
dayOfWeek = currDate.getDay();

if (dayOfWeek === 1 || dayOfWeek === 2) {
  const banner = document.createElement('p');
  banner.id = 'banner';
  banner.innerHTML =
    '🤝🏼 Come join us for the chamber meet and greet Wednesday at 7:00p.m.';
  document.getElementById('bannerContainer').append(banner);
}

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

fetch('./data/data.json')
  .then((response) => response.json())
  .then(function (jsonObject) {
    console.table(jsonObject); // temporary checking for valid response and data parsing
    const directory = jsonObject['directory'];
    directory.forEach((dir) => displayDirectory(dir));
  });

function displayDirectory(dir) {
  // Create elements to add to the document
  let card = document.createElement('section');
  let image = document.createElement('img');
  let h2 = document.createElement('h2');
  let address = document.createElement('p');
  let phoneNumber = document.createElement('p');
  let website = document.createElement('a');

  // Change the textContent property of the h2 element to contain the prophet's full name
  if (h2) h2.textContent = dir.name;
  if (address) address.textContent = `Address: ${dir.address}`;
  if (phoneNumber) phoneNumber.textContent = `Contact: ${dir.phoneNumber}`;
  if (website) {
    website.textContent = dir.website;
    website.href = dir.website;
  }

  // Build the image attributes by using the setAttribute method for the src, alt, and loading attribute values. (Fill in the blank with the appropriate variable).
  image.setAttribute('src', dir.imgUrl);
  image.setAttribute('alt', `${dir.name}`);
  image.setAttribute('loading', 'lazy');

  // Add/append the section(card) with the h2 element
  card.appendChild(h2);
  card.appendChild(image);
  card.appendChild(address);
  card.appendChild(phoneNumber);
  card.appendChild(website);

  // Add/append the existing HTML div with the cards class with the section(card)
  const divGrid = document.querySelector('div.grid');
  if (divGrid) divGrid.appendChild(card);
}

const gridbutton = document.querySelector('#grid');
const listbutton = document.querySelector('#list');
const display = document.querySelector('#business');

if (gridButton) {
  gridbutton.addEventListener('click', () => {
    // example using arrow function
    if (display) {
      display.classList.add('grid');
      display.classList.remove('list');
    }
  });
}

if (listButton) listbutton.addEventListener('click', showList);

function showList() {
  if (display) {
    display.classList.add('list');
    display.classList.remove('grid');
  }
}
