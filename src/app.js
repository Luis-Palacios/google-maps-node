const googleMaps = require('@google/maps');

const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

const googleMapsClient = googleMaps.createClient({
  key: googleMapsApiKey,
});
