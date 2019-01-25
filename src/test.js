const geoFenceService = require('./geofence.service');

async function test() {
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
  // const currentUserLocation = { lat: 12.148578499999998, lng: -86.2902213 };

  // Valid locations
  const currentUserLocation = { lat: 12.1455785, lng: -86.2902213 };
  // const currentUserLocation = { lat: 12.149578499999997, lng: -86.2902213 };

  const isInGeoFence = await geoFenceService.isLocationInGeoFence(origin,
    destination, waypoints, meters, currentUserLocation);
  console.log(isInGeoFence);
}
test();
