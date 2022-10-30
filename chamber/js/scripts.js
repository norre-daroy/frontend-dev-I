const currentDate = new Intl.DateTimeFormat('en-UK', {
  dateStyle: 'full',
}).format(new Date());

// // Locally store date of last visit
window.localStorage.setItem('lastVisit', currentDate);

// // Retrieve last visit date from local storage
const lastVisit = localStorage.getItem('lastVisit');

const date1 = new Date();
const date2 = new Date(lastVisit);

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
document.querySelector('#lastVisit').innerHTML = displayLastVisit;
document.querySelector('#currentDate').innerHTML = currentDate;

// Hamburger button toggle menu
function toggleMenu() {
  document.getElementById('primaryNav').classList.toggle('open');
  document.getElementById('hamburgerBtn').classList.toggle('open');
}

const menuButton = document.getElementById('hamburgerBtn');
menuButton.onclick = toggleMenu;

document.getElementById('join').onclick = function () {
  location.href = 'https://norre-daroy.github.io/wdd230/chamber/join.html';
};

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

document.querySelector('#year').innerHTML = year;
document.querySelector('#date').innerHTML = dateTimeLastModified;
