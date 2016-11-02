const EventSearch = require('facebook-events-by-location-core');
const https = require('https');

const appId = '1729664434025571'
const appSecret = 'fb24916f592c9dd9dcb26c998eb0a28a'

exports.getFBEvents = (long, lat) => {
  var results = "";

  console.log(long);
  console.log(lat);
  const es = new EventSearch({
    accessToken: appId+'|'+appSecret,
    lat: lat,
    lng: long,
    distance: '2500',
  });

  es.search().then((events) => {
    results = (JSON.stringify(events));
    //þetta er console.log 2
    console.log(JSON.stringify(events));
  }).catch((error) => {
    console.error(JSON.stringify(error));
  });

  return results;
};
