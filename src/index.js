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
    wind: data.wind,
  };
}

getWeather('Eureka').then((result) => console.log(processData(result)));
