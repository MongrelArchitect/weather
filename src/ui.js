import { getWeather, processData } from './getWeather';

export function drawError(message, error) {
  const errorMessage = document.querySelector('.error');
  errorMessage.className = 'error visible';
  errorMessage.textContent = message;
}

function clearError() {
  const errorMessage = document.querySelector('.error');
  errorMessage.className = 'error';
  errorMessage.textContent = 'Looks good!';
}

function drawWeather(data) {
  const cityName = document.querySelector('.city-name');
  const temp = document.querySelector('.temp');
  const weatherDesc = document.querySelector('.weather-desc');
  const humidity = document.querySelector('.humidity');
  const clouds = document.querySelector('.clouds');
  const wind = document.querySelector('.wind');

  cityName.textContent = data.name;
  temp.textContent = `${data.temp} °F`;
  weatherDesc.textContent = data.weather.description;
  humidity.textContent = `${data.humidity}% humidity`;
  clouds.textContent = `${data.clouds}% cloud cover`;
  wind.textContent = `wind speed: ${data.wind}mph`;
}

export function searchCity() {
  const searchField = document.querySelector('input');
  searchField.addEventListener('input', (event) => {
    if (!event.target.value) {
      drawError('Please enter a city name');
    } else {
      clearError();
    }
  });

  const searchButton = document.querySelector('button');
  searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    const city = searchField.value;
    if (!city) {
      drawError('Please enter a city name');
    } else {
      getWeather(city)
        .then((result) => drawWeather(processData(result)))
        .catch((error) => drawError('No results - try again', error));
    }
  });
}
