const googleMaps = require('@google/maps');
const jsts = require('jsts');
const polyline = require('@mapbox/polyline');
const geolib = require('geolib');

function getDirections(origin, destination, waypoints) {
  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
  const googleMapsClient = googleMaps.createClient({
    key: googleMapsApiKey,
    Promise,
  });

  return googleMapsClient.directions({
    origin,
    destination,
    waypoints,
    optimize: true,
    alternatives: false,
    mode: 'driving',
  }).asPromise();
}

function getGeofenceCordinates(encodedPolylinePoints, meters) {
  const overviewPath = polyline.decode(encodedPolylinePoints);
  const distance = (meters / 1000) / 111.12; // Convert grade a long
  const geoInput = {
    type: 'LineString',
    coordinates: overviewPath,
  };
  const geoReader = new jsts.io.GeoJSONReader();
  const geoWriter = new jsts.io.GeoJSONWriter();

  const geomertry = geoReader.read(geoInput).buffer(distance);
  const polygon = geoWriter.write(geomertry);
  return polygon.coordinates[0].map(
    pos => ({ latitude: pos[0], longitude: pos[1] }),
  );
}

function isPointInCordinates(point, cordinates) {
  const isInCordinates = geolib.isPointInside({
    latitude: point.lat,
    longitude: point.lng,
  }, cordinates);
  return isInCordinates;
}

module.exports.getDirections = getDirections;
module.exports.getGeofenceCordinates = getGeofenceCordinates;
module.exports.isPointInCordinates = isPointInCordinates;
