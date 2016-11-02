const dataFetcher = require("./dataFetcher.js")
const http = require('http');


exports.searchEvents = (req, res, next) => {
  const results = dataFetcher.getFBEvents(req.longitude, req.latitude);
  req.value = results;
  next();
};

exports.getLocationByIP = (req, res, next) => {
  const tempIP = "130.208.131.18";
  req.testIP = tempIP;

  http.get({
        host: 'geoplugin.net',
        path: '/json.gp?ip='+req.testIP
    }, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {

            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            console.log(parsed);
            req.ipInfo = parsed;
            req.longitude = parsed.geoplugin_longitude;
            req.latitude = parsed.geoplugin_latitude;
            next();
        });
    });
};
