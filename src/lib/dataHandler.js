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

exports.filterEvents = (req,res,next) => {
    console.log(filters.startTime);
    for(var event in events){
        if(filters.startTime > events[event]){
            console.log(events[event]);
        }
    }
    next();
}

//þetta er skítamix, getum samt notað innihaldið þegar við erum búinir að redda
//þessu me getFBEvents async dæmið
exports.setFBEvents = (req, res, next) => {
    var obj = JSON.parse(req.results);
    events = obj.events;
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
