import { getWeather, processData } from './getWeather';

function showLoading() {
  const loading = document.querySelector('.loading');
  loading.className = 'loading visible';
}

function hideLoading() {
  const loading = document.querySelector('.loading');
  loading.className = 'loading';
}

export function drawError(message) {
  hideLoading();
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
  temp.textContent = `${data.temp}°F`;
  weatherDesc.textContent = data.weather.description;
  humidity.textContent = `${data.humidity}% humidity`;
  clouds.textContent = `${data.clouds}% cloud cover`;
  wind.textContent = `wind speed: ${data.wind}mph`;
}

function drawBackground(id) {
  const simpleId = () => {
    if (id >= 200 && id <= 232) {
      return 200;
    }
    if (id >= 300 && id <= 321) {
      return 300;
    }
    if (id >= 500 && id <= 531) {
      return 500;
    }
    if (id >= 600 && id <= 622) {
      return 600;
    }
    if (id >= 701 && id <= 781) {
      return id;
    }
    if (id === 800) {
      return id;
    }
    if (id >= 801 && id <= 802) {
      return id;
    }
    return 803;
  };

  const backgrounds = {
    200: 'thunder',
    300: 'drizzle',
    500: 'rain',
    600: 'snow',
    701: 'mist',
    711: 'smoke',
    721: 'haze',
    731: 'dust',
    741: 'mist',
    751: 'dust',
    761: 'dust',
    762: 'dust',
    771: 'rain',
    781: 'tornado',
    800: 'clear',
    801: 'few-clouds',
    802: 'few-clouds',
    803: 'cloudy',
    804: 'overcast',
  };

  const container = document.querySelector('.container');
  container.setAttribute(
    'style',
    `background-image: url("./images/${backgrounds[simpleId()]}.jpg");`,
  );
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
    showLoading();
    if (!city) {
      drawError('Please enter a city name');
    } else {
      getWeather(city)
        .then((result) => {
          const data = processData(result);
          drawWeather(data);
          drawBackground(data.weather.id);
          hideLoading();
        })
        .catch(() => drawError('No results - try again'));
    }
  });
}

export function loadDefault() {
  showLoading();
  getWeather('Oxnard')
    .then((result) => {
      const data = processData(result);
      drawWeather(data);
      drawBackground(data.weather.id);
      hideLoading();
    })
    .catch(() => drawError('No results - try again'));
}
