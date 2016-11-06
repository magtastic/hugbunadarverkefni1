"use strict"
const EventSearch = require('facebook-events-by-location-core');
//munum þá væntanlega líka deleta þessu
//const dataHandler = require("./dataHandler.js")
const https = require('https');

const appId = '1729664434025571'
const appSecret = 'fb24916f592c9dd9dcb26c998eb0a28a'

let appToken = "";

exports.searchEvents = (req, res, next) => {
  var results = "";

  console.log(req.longitude);
  console.log(req.latitude);
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

    //dataHandler.setFBEvents(results);
  }).catch((error) => {
    console.error(JSON.stringify(error));
  });
};


exports.getAuthToken = (req,res,next) => {
  https.get({
        host: 'graph.facebook.com',
        path: '/oauth/access_token'+
              '?client_id='+appId+
              '&client_secret='+appSecret+
              '&grant_type=client_credentials'
    }, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            appToken = body.split("=")[1];
            next();
        });
    });
}