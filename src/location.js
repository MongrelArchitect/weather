const L = require('leaflet');

export function loadMap(coord) {
  const map = L.map('map', {
    center: [coord.lat, coord.lon],
    zoom: 12,
    zoomControl: false,
    dragging: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false,
    scrollWheelZoom: false,
  });
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
}

export async function getLocation() {
  // Get location from public IP address using Geoapify
  const apiKey = '2d0815d78f05430fbbe17e0c926c3ef0';

  const response = await fetch(
    `https://api.geoapify.com/v1/ipinfo?&apiKey=${apiKey}`,
    { method: 'GET' },
  );

  const result = await response.json();
  return result;
}
