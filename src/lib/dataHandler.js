const http = require('http');

let events = [];

// gives longitude and latitude for an IP
exports.getLocationByIP = (req, res, next) => {
  // Setjið IP tölu hér inn fyrir developing...
  const tempIP = '130.208.151.126';

  req.testIP = tempIP;

  http.get({
    host: 'geoplugin.net',
    path: `/json.gp?ip=${req.testIP}`,
  }, (response) => {
        // Continuously update stream with data
    let body = '';
    response.on('data', (d) => {
      body += d;
    });
    response.on('end', () => {
            // Data reception is done, do whatever with it!
      const parsed = JSON.parse(body);
      req.ipInfo = parsed;
      req.longitude = parsed.geoplugin_longitude;
      req.latitude = parsed.geoplugin_latitude;
      next();
    });
  });
};

// keeping FB events so we dont need
// to request for them again when ordering or filtering.
exports.setFBEvents = (req, res, next) => {
  const obj = JSON.parse(req.results);
  events = obj.events;
  res.locals.events = events;
  next();
};
