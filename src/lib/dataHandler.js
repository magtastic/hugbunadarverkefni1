const dataFetcher = require("./dataFetcher.js")
const http = require('http');


exports.searchEvents = (req, res, next) => {
  //Við köllum ég á getFBEvents en í því falli er async kall. Því 
  //getur getFBEvents í raun ekki skilað neinu results nema við gerum eitthvað
  //nodejs trixxx sem lætur það vera sync. console.log 1 keyrir á undan console.log 2
  const results = dataFetcher.getFBEvents(req.longitude, req.latitude);
  //þetta er console.log 1
  console.log(results);
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


//þetta er skítamix, getum samt notað innihaldið þegar við erum búinir að redda 
//þessu me getFBEvents async dæmið
exports.setFBEvents = (queryResults) => {
    var obj = JSON.parse(queryResults);
    var events = obj.events;
    var num = 0;
    for(event in events){
        num ++;
        console.log("-----------------------")
        console.log("event numer "+num);
        console.log(events[event]);
        console.log("-----------------------")
    }
    
}