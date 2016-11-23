const dataFetcher = require("./dataFetcher.js");
const http = require('http');
let events = [];
let filterdEvents = [];
let filters = {
    startTime: new Date(),
    endTime: new Date(),
    minAttenders: 0,
    maxAttenders: null
};

//gives longitude and latitude for an IP
exports.getLocationByIP = (req, res, next) => {

  //Setjið IP tölu hér inn fyrir developing...
  const tempIP = "130.208.151.126";

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
/*exports.filterEvents = (req,res,next) => {

    if(filters.startTime.valueOf() == filters.endTime.valueOf()){
        filters.endTime.setDate(filters.endTime.getDate()+1);
    }

    var tmpStartDate = "";
    var tmpEndDate= "";

    for(var event in events){
        tmpStartDate = new Date(events[event].startTime);
        tmpEndDate = new Date(events[event].endTime);
        if(tmpStartDate < filters.endTime && tmpEndDate > filters.startTime){
            filterdEvents.push(events[event]);
        }
    }
    res.locals.filterdEvents = filterdEvents;
    next();
}*/


// keeping FB events so we dont need
// to request for them again when ordering or filtering.
exports.setFBEvents = (req, res, next) => {
    var obj = JSON.parse(req.results);
    events = obj.events;
    res.locals.events = events;
    for(var ev in events){
        console.log("------------------");
        console.log(events[ev].name);
        console.log(events[ev].startTime);
        console.log(ev);
        console.log("------------------");
    }
    next();
}
