import './styles/reset.css';
import './styles/style.css';

import getWeather from './getWeather';

function processData(data) {
  return {
    name: data.name,
    weather: {
      name: data.weather[0].main,
      description: data.weather[0].description,
    },
    temp: data.main.temp,
    coord: data.coord,
    clouds: data.clouds.all,
    wind: data.wind.speed,
  };
}

function drawWeather(data) {
  const cityName = document.querySelector('.city-name');
  const weatherName = document.querySelector('.weather-name');
  const temp = document.querySelector('.temp');
  const weatherDesc = document.querySelector('.weather-desc');
  const clouds = document.querySelector('.clouds');
  const wind = document.querySelector('.wind');

  cityName.textContent = data.name;
  weatherName.textContent = data.weather.name;
  temp.textContent = `${data.temp} °F`;
  weatherDesc.textContent = data.weather.description;
  clouds.textContent = `${data.clouds}% cloud cover`;
  wind.textContent = `Wind speed: ${data.wind}mph`;
}

function searchCity() {
  const searchButton = document.querySelector('button');
  searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    const city = document.querySelector('input').value;
    getWeather(city).then((result) => drawWeather(processData(result)));
  });
}

searchCity();
