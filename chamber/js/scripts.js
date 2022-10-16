const currentDate = new Intl.DateTimeFormat('en-UK', {
  dateStyle: 'full',
}).format(new Date());

document.querySelector('#currentDate').innerHTML = currentDate;

// Hamburger button toggle menu
function toggleMenu() {
  document.getElementById('primaryNav').classList.toggle('open');
  document.getElementById('hamburgerBtn').classList.toggle('open');
}

const menuButton = document.getElementById('hamburgerBtn');
menuButton.onclick = toggleMenu;

//Date
const currDate = new Date();
dayOfWeek = currDate.getDay();

if (dayOfWeek === 1 && dayOfWeek === 2) {
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
