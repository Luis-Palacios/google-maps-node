const geolocationUtilService = require('./geolocation-utill.service');

async function isLocationInGeoFence(origin, destination, waypoints, meters, location) {
  const directions = await geolocationUtilService
    .getDirections(origin, destination, waypoints);
  const encodedPolylinePoints = directions.json.routes[0].overview_polyline.points;
  const geoFenceCordinates = geolocationUtilService
    .getGeofenceCordinates(encodedPolylinePoints, meters);

  const isInGeoFence = geolocationUtilService
    .isPointInCordinates(location, geoFenceCordinates);

  return isInGeoFence;
}

module.exports.isLocationInGeoFence = isLocationInGeoFence;
