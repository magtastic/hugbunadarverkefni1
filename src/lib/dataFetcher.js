
const EventSearch = require('facebook-events-by-location-core')

exports.getStuff = function(req, res, next) {

  let es = new EventSearch({
      "accessToken": "fb24916f592c9dd9dcb26c998eb0a28a",
      "lat": 40.710803,
      "lng": -73.964040
  });

  es.search().then(function (events) {
      console.log(JSON.stringify(events));
  }).catch(function (error) {
      console.error(JSON.stringify(error));
  });
  req.value = "Virkar thetta ?"

  next();
}
