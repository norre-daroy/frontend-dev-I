const temperature = document.getElementById('temp').textContent;
const speed = document.getElementById('windSpeed').textContent;

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
