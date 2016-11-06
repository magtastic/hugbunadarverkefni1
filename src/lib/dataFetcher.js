const EventSearch = require('facebook-events-by-location-core');
//munum þá væntanlega líka deleta þessu
//const dataHandler = require("./dataHandler.js")
const https = require('https');

const appId = '1729664434025571'
const appSecret = 'fb24916f592c9dd9dcb26c998eb0a28a'

exports.searchEvents = (req, res, next) => {
  var results = "";

  console.log(req.longitude);
  console.log(req.latitude);
  const es = new EventSearch({
    accessToken: appId+'|'+appSecret,
    lat: req.latitude,
    lng: req.longitude,
    distance: '2500',
  });
  es.search().then((events) => {
    //þetta er console.log 2
    //console.log(JSON.stringify(events));
    //þetta er skitamix

    results = JSON.stringify(events);
    req.results = results;
    next();

    //dataHandler.setFBEvents(results);
  }).catch((error) => {
    console.error(JSON.stringify(error));
  });
};
