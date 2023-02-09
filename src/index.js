import './styles/reset.css';
import './styles/style.css';

import { searchCity, loadDefault } from './ui';

async function getLocation() {
  // Get location from public IP address using Geoapify
  const apiKey = '2d0815d78f05430fbbe17e0c926c3ef0';

  const response = await fetch(
    `https://api.geoapify.com/v1/ipinfo?&apiKey=${apiKey}`,
    { method: 'GET' },
  );

  const result = await response.json();
  return result.city.name;
}

// Initial page load with the user's location
getLocation()
  .then((location) => {
    loadDefault(location);
  })
  .catch(() => {
    // Default city in case there's a problem getting location from IP
    loadDefault('Oxnard'); // Nardcore
  });

searchCity();
