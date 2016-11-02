
const EventSearch = require('facebook-events-by-location-core');

exports.getStuff = function (req, res, next) {
  const es = new EventSearch({
    lat: 40.710803,
    lng: -73.964040,
  });

  es.search().then((events) => {
    console.log(JSON.stringify(events));
  }).catch((error) => {
    console.error(JSON.stringify(error));
  });
  req.value = 'Virkar thetta ?';

  next();
};
