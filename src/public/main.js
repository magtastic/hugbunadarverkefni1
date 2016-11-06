// NOT IN USE

// var request = new XMLHttpRequest();
// request.open('GET', "http://jsonip.com/?callback=", true);
// request.onreadystatechange = processRequest;
// request.send();
//
// function processRequest(e){
//     if (request.readyState == 4 && request.status == 200) {
//         var response = JSON.parse(request.responseText);
//         console.log(response);
//         var myIp = response.ip;
//         postIP(myIp);
//     }
// }
//
// function postIP(ip){
//     console.log("here");
//   request.open('POST', '/ip', true);
//   request.onreadystatechange = null;
//   request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//   var object = {"ip": ip};
//   request.send(JSON.stringify(object));
// }
