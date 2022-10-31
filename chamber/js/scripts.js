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
