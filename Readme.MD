# Google maps node API client

Test the [Node.js Client for Google Maps Services](https://github.com/googlemaps/google-maps-services-js) and some geofence concepts

## Pre-Requisites

1. Nodejs

## Setup

1. Clone the repository
2. Install all dependencies via `npm install`
3. Create an .env file on the root of the project and define your google maps api key there see .env.example for more details

## Run the application

1. Run `npm start`
2. Run tests `npm test`
3. The service is exposed trough express.js on the root url of port 3000 example of test usage: `http://localhost:3000/?origin[lat]=12.1392&origin[lng]=-86.2869&destination[lat]=12.1447&destination[lng]=-86.2960&meters=300&currentLocation[lat]=12.1455&currentLocation[lng]=-86.2902&waypoints[0][lat]=12.1392&waypoints[0][lng]=-86.2869&waypoints[1][lat]=12.1538&waypoints[1][lng]=-86.2880&waypoints[2][lat]=12.1411&waypoints[2][lng]=-86.2921&waypoints[3][lat]=12.1447&waypoints[3][lng]=-86.2960`
4. See `src/test.js` for more detail on parameters
