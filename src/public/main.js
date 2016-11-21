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

// $("#btn").click(function(){
//             var geocoder =  new google.maps.Geocoder();
//     geocoder.geocode( { 'address': 'miami, us'}, function(results, status) {
//           if (status == google.maps.GeocoderStatus.OK) {
//             alert("location : " + results[0].geometry.location.lat() + " " +results[0].geometry.location.lng());
//           } else {
//             alert("Something got wrong " + status);
//           }
//         });
// });

$(document).ready(() => {
  const theForm = $('.inputbox');
  const inputBox = $(theForm.find('input'));
  inputBox.keypress((e) => {
    const enterKeycode = 13;
    if (e.keyCode === enterKeycode) {
      console.log('hae');
      e.preventDefault();
      const inputValue = inputBox.val();
      getLatitudeAndLongitude(processResponse, inputValue);
    }
  });
  function getLatitudeAndLongitude (callback, inputValue) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': inputValue}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            console.log("location : " + results[0].geometry.location.lat() + " " +results[0].geometry.location.lng());
          } else {
            console.log("Something got wrong " + status);
          }
          if (results)
          callback(results);
        });
  }
  function processResponse (results) {
    inputBox.val([results[0].geometry.location.lat(), results[0].geometry.location.lng()]);
    theForm.submit();
  }
})
