import { getWeather, processData } from './getWeather';

function showLoading() {
  // Show when awaiting api calls
  const loading = document.querySelector('.loading');
  loading.className = 'loading visible';
}

function hideLoading() {
  // Not waiting anymore
  const loading = document.querySelector('.loading');
  loading.className = 'loading';
}

export function drawError(message) {
  // Display error to user
  hideLoading();
  const errorMessage = document.querySelector('.error');
  errorMessage.className = 'error visible';
  errorMessage.textContent = message;
}

function clearError() {
  // Everthing's ok so far
  const errorMessage = document.querySelector('.error');
  errorMessage.className = 'error';
  errorMessage.textContent = 'Looks good!';
}

function drawWeather(data) {
  // Display the weather data
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
  // Too many weather conditions to bother with a unique image for each
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
    if (id === 800 || id === 804) {
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
  // Warn the user if they've got an empy search
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
    // Show loading icon before any async stuff starts
    showLoading();
    const city = searchField.value;
    if (!city) {
      // Warn the user if they've got an empy search
      drawError('Please enter a city name');
    } else {
      getWeather(city)
        .then((result) => {
          const data = processData(result);
          // Show weather data & change background accordingly
          drawWeather(data);
          drawBackground(data.weather.id);
          // Not waiting anymore
          hideLoading();
        })
        // No response or bad search query, so no results to show =(
        .catch(() => drawError('No results - try again'));
    }
  });
}

export function loadDefault(location) {
  // A default weather search for the initial page load
  showLoading();
  getWeather(location)
    .then((result) => {
      const data = processData(result);
      drawWeather(data);
      drawBackground(data.weather.id);
      hideLoading();
    })
    .catch(() => drawError('No results - try again'));
}
