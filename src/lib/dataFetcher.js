
const EventSearch = require('facebook-events-by-location-core');

exports.getFBEvents = (long, lat) => {

  console.log(long);
  console.log(lat);
  const es = new EventSearch({
    accessToken: '1729664434025571|fb24916f592c9dd9dcb26c998eb0a28a',
    lat: lat,
    lng: long,
    distance: '2500',
  });

  es.search().then((events) => {
    console.log(JSON.stringify(events));
  }).catch((error) => {
    console.error(JSON.stringify(error));
  });

  const results = 'Virkar thetta ?';
  return results;
};
