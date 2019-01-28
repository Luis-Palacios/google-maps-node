const assert = require('assert');
const geoFenceService = require('./geofence.service');

describe('geoFenceService', () => {
  // Test parameters
  const origin = { lat: 12.1392374829317, lng: -86.286998949945 };
  const destination = { lat: 12.1447169109533, lng: -86.296053417027 };
  const waypoints = [
    { lat: 12.1392374829317, lng: -86.286998949945 },
    { lat: 12.1538583269418, lng: -86.2880882620811 },
    { lat: 12.1411697341314, lng: -86.2921715900302 },
    { lat: 12.1447169109533, lng: -86.296053417027 }];
  const meters = 100;
  const validLocations = [
    { lat: 12.1455785, lng: -86.2902213 },
    { lat: 12.149578499999997, lng: -86.2902213 },
  ];
  const inValidLocations = [
    { lat: 12.1465032, lng: -86.2903192 },
    { lat: 12.147578499999998, lng: -86.2902213 },
    { lat: 12.148578499999998, lng: -86.2902213 },
  ];

  describe('isLocationInGeoFence', () => {
    it('should return true when user location is inside geofence bounds', async () => {
      // This is a valid location
      const validUserLocation = validLocations[0];
      const isInGeoFence = await geoFenceService.isLocationInGeoFence(origin,
        destination, waypoints, meters, validUserLocation);
      assert.equal(isInGeoFence, true);
    });

    it('should return true when user location is inside geofence bounds (2)', async () => {
      // This is a valid location
      const validUserLocation = validLocations[1];
      const isInGeoFence = await geoFenceService.isLocationInGeoFence(origin,
        destination, waypoints, meters, validUserLocation);
      assert.equal(isInGeoFence, true);
    });

    it('should return false when user location is outside geofence bounds', async () => {
      // This is a valid location
      const validUserLocation = inValidLocations[0];
      const isInGeoFence = await geoFenceService.isLocationInGeoFence(origin,
        destination, waypoints, meters, validUserLocation);
      assert.equal(isInGeoFence, false);
    });

    it('should return false when user location is outside geofence bounds (2)', async () => {
      // This is a valid location
      const validUserLocation = inValidLocations[1];
      const isInGeoFence = await geoFenceService.isLocationInGeoFence(origin,
        destination, waypoints, meters, validUserLocation);
      assert.equal(isInGeoFence, false);
    });

    it('should return false when user location is outside geofence bounds (3)', async () => {
      // This is a valid location
      const validUserLocation = inValidLocations[2];
      const isInGeoFence = await geoFenceService.isLocationInGeoFence(origin,
        destination, waypoints, meters, validUserLocation);
      assert.equal(isInGeoFence, false);
    });
  });
});
