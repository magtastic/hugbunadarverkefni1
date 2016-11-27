const EventSearch = require('facebook-events-by-location-core');
const https = require('https');

let appToken = '';

// fetching all events 2500meters around the given longitude and latitude
exports.searchEvents = (req, res, next) => {
  let results = '';

  const es = new EventSearch({
    accessToken: appToken,
    lat: req.latitude,
    lng: req.longitude,
    distance: '2500',
  });
  es.search().then((events) => {
    results = JSON.stringify(events);
    req.results = results;
    next();
  }).catch((error) => {
    console.error(JSON.stringify(error));
  });
};
// access token for FB app
exports.getAuthToken = (req, res, next) => {
  https.get({
    host: 'graph.facebook.com',
    path: '/oauth/access_token' +
              '?client_id=' + '1729664434025571' +
              '&client_secret=' + 'fb24916f592c9dd9dcb26c998eb0a28a' +
              '&grant_type=client_credentials',
  }, (response) => {
    let body = '';
    response.on('data', (d) => {
      body += d;
    });
    response.on('end', () => {
      appToken = body.split('=')[1];
      next();
    });
  });
};
