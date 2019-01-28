const express = require('express');
const geoFenceService = require('./geofence.service');

const app = express();
const port = 3000;

// /?origin[lat]=12.1392&origin[lng]=-86.2869&destination[lat]=12.1447&destination[lng]=-86.2960
// &meters=300&currentLocation[lat]=12.1455&currentLocation[lng]=-86.2902
// &waypoints[0][lat]=12.1392&waypoints[0][lng]=-86.2869
// &waypoints[1][lat]=12.1538&waypoints[1][lng]=-86.2880
// &waypoints[2][lat]=12.1411&waypoints[2][lng]=-86.2921
// &waypoints[3][lat]=12.1447&waypoints[3][lng]=-86.2960
app.get('/', async (req, res) => {
  const {
    origin,
    destination,
    waypoints,
    meters,
    currentLocation,
  } = req.query;

  // TODO: Check parameters here

  const isInLocation = await geoFenceService
    .isLocationInGeoFence(origin, destination, waypoints, meters, currentLocation);

  res.json({
    result: isInLocation,
  });
});

app.listen(port, () => console.log(`App running on port ${port}`));
