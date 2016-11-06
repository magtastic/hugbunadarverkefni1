"use strict"
const dataFetcher = require("./dataFetcher.js")
const http = require('http');
let events = {};
let filters = {
    startTime: new Date(),
    endTime: Date.now(),
    minAttenders: 0,
    maxAttenders: null
};

//gives longitude and latitude for an IP
exports.getLocationByIP = (req, res, next) => {

  //Setjið IP tölu hér inn fyrir developing...
  const tempIP = "Setjið ykkar IP-tölu hér";

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

//Filtering events by user preferences
exports.filterEvents = (req,res,next) => {
    console.log(filters.startTime);
    for(var event in events){
        if(filters.startTime > events[event]){
            console.log(events[event]);
        }
    }
    next();
}


// keeping FB events so we dont need
// to request for them again when ordering or filtering.
exports.setFBEvents = (req, res, next) => {
    var obj = JSON.parse(req.results);
    var events = obj.events;
    res.locals.events = obj.events;
    var num = 0;
    for(var event in events){
        num ++;
        console.log("-----------------------")
        console.log("event numer "+num);
        console.log(events[event]);
        console.log("-----------------------")
    }
    next();
}
