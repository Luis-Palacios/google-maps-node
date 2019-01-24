const googleMaps = require('@google/maps');
const jsts = require('jsts');
const polyline = require('@mapbox/polyline');
const geolib = require('geolib');


const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

const googleMapsClient = googleMaps.createClient({
  key: googleMapsApiKey,
});

// Test parameters
const origin = { lat: 12.1392374829317, lng: -86.286998949945 };
const destination = { lat: 12.1447169109533, lng: -86.296053417027 };
const waypoints = [
  { lat: 12.1392374829317, lng: -86.286998949945 },
  { lat: 12.1538583269418, lng: -86.2880882620811 },
  { lat: 12.1411697341314, lng: -86.2921715900302 },
  { lat: 12.1447169109533, lng: -86.296053417027 }];
const meters = 100;

// Invalid locations
// const currentUserLocation = { lat: 12.1465032, lng: -86.2903192 };
// const currentUserLocation = { lat: 12.147578499999998, lng: -86.2902213 };
const currentUserLocation = { lat: 12.148578499999998, lng: -86.2902213 };

// Valid locations
// const currentUserLocation = { lat: 12.1455785, lng: -86.2902213 };
// const currentUserLocation = { lat: 12.149578499999997, lng: -86.2902213 };


googleMapsClient.directions({
  origin,
  destination,
  waypoints,
  optimize: true,
  alternatives: false,
  mode: 'driving',
}, (err, res) => {
  const encodedPolylinePoints = res.json.routes[0].overview_polyline.points;
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

  const gelibPolygon = polygon.coordinates[0].map(pos => ({ latitude: pos[0], longitude: pos[1] }));

  const isInGeoFence = geolib.isPointInside({
    latitude: currentUserLocation.lat,
    longitude: currentUserLocation.lng,
  }, gelibPolygon);

  console.log(isInGeoFence);
});
