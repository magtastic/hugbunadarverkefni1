var requst = new XMLHttpRequest();
requst.open('GET', "http://jsonip.com/?callback=", true);
requst.onreadystatechange = processRequest;
requst.send();

function processRequest(e){
    if (requst.readyState == 4 && requst.status == 200) {
        var response = JSON.parse(requst.responseText);
        console.log(response);
        var myIp = response.ip;
        var testString = "moneymoney";
        postIP(testString);
    }
}

function postIP(ip){
  requst.open('POST', '/ip', true);
  requst.onreadystatechange = null;
  requst.send(ip);
}
