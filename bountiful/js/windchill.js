const currentTemp = document.getElementById('temp');
const feelsTemp = document.querySelector('#feels-temp');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#windSpeed');

const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const apiKey = '01279152f45084dd0b2b1b23e7bce8cb';
const q = 'Carlsbad';
const units = 'imperial';
// Tried this to fetch 3 day forecast but it returns nesting arrays of forecast for every 3hrs. I tried fetching to exclude hourly forecasts but it doesn't seem to work and I'm running out of time :(
// const url = `https://api.openweathermap.org/data/2.5/forecast?q=${q}&current=current&weather?units=${units}&appid=${apiKey}`;
const url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=${units}&appid=${apiKey}`;

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayResults(weatherData) {
  const temperature = weatherData.main.temp;
  const speed = weatherData.wind.speed;

  let windChill = (
    35.74 +
    0.6215 * temperature -
    35.75 * speed ** 0.16 +
    0.4275 * temperature * speed ** 0.16
  ).toFixed(2);

  if (temperature > 50 || speed <= 3) {
    windChill = 'N/A';
  }

  document.getElementById('windChill').textContent = windChill;
  currentTemp.innerHTML = `<strong>${temperature.toFixed(0)}</strong>`;

  feelsTemp.textContent = weatherData.main.feels_like.toFixed(0);
  humidity.textContent = weatherData.main.humidity;
  windSpeed.textContent = speed;

  const weather = weatherData.weather[0];
  const iconsrc = `https://openweathermap.org/img/w/${weather.icon}.png`;
  const desc = weather.description;

  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = desc;
}

apiFetch();
