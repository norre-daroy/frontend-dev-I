const currentDate = new Intl.DateTimeFormat("en-UK", {
  dateStyle: "full",
}).format(new Date());

document.querySelector("#currentDate").innerHTML = currentDate;

// Hamburger button toggle menu
function toggleMenu() {
  document.getElementById("primaryNav").classList.toggle("open");
  document.getElementById("hamburgerBtn").classList.toggle("open");
}

const menuButton = document.getElementById("hamburgerBtn");
menuButton.onclick = toggleMenu;

// Last modified
const dateTimeLastModified = `Last modification: ${document.lastModified}`;
const year = new Date(document.lastModified).getFullYear();

document.querySelector("#year").innerHTML = year;
document.querySelector("#date").innerHTML = dateTimeLastModified;
