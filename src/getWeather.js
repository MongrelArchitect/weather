const apiKey = 'b092e80f858601cbd87cccbe20c69611';

async function getCoordinates(cityName) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`,
      { mode: 'cors' },
    );

    const result = await response.json();
    return { lat: result[0].lat, lon: result[0].lon };
  } catch (error) {
    console.error(`Error converting ${cityName} to coordinates: ${error}`);
    return null;
  }
}

async function getLocationData(coordinates) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${apiKey}`,
      { mode: 'cors' },
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error getting location data: ${error}`);
    return null;
  }
}

export default function getWeather(cityName) {
  return getCoordinates(cityName)
    .then((coordinates) => getLocationData(coordinates))
    .then((result) => result);
}
