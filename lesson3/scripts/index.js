const dateTimeLastModified = `Last updated: ${document.lastModified}`;
const year = new Date(document.lastModified).getFullYear();

document.querySelector("#year").innerHTML = year;
document.querySelector("#date").innerHTML = dateTimeLastModified;
