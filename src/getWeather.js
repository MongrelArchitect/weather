const apiKey = 'b092e80f858601cbd87cccbe20c69611';

async function getCoordinates(cityName) {
  // Convert city name to coordiates using Open Weather's geocoder API
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`,
    { mode: 'cors' },
  );

  const result = await response.json();
  return { lat: result[0].lat, lon: result[0].lon };
}

async function getLocationData(coordinates) {
  // Grab the weather data based on lat / long coordinates
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${apiKey}`,
    { mode: 'cors' },
  );

  const result = await response.json();
  return result;
}

export function getWeather(cityName) {
  // Chain em up
  return getCoordinates(cityName)
    .then((coordinates) => getLocationData(coordinates))
    .then((result) => result);
}

export function processData(data) {
  // Process just the data we need for our app
  return {
    name: data.name,
    weather: {
      id: data.weather[0].id,
      name: data.weather[0].main,
      description: data.weather[0].description,
    },
    humidity: data.main.humidity,
    temp: Math.round(data.main.temp),
    coord: data.coord,
    clouds: data.clouds.all,
    wind: Math.round(data.wind.speed),
  };
}
