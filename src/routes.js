const express = require('express');
const router = express.Router();
const dataHandler = require("./lib/dataHandler.js");
const dataFetcher = require("./lib/dataFetcher.js");
//const bodyParser = require('body-parser');

//router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', dataFetcher.getAuthToken, dataHandler.getLocationByIP, 
                dataFetcher.searchEvents, dataHandler.setFBEvents, (req, res, next) => {
  const title = 'Heimasíðan okkar';
  const data = { title };

  res.render('index', data);
});

router.post('/', (req, res, next) => {
  const title = 'Niðurstöður margföldunar';
  const data = { title };
  res.render('index', data);
});

router.post('/ip', (req, res, next) => {
  const title = 'Niðurstöður margföldunar';
  const data = { title };
/*
  console.log("Hér var kallað á /ip með post úr main.js");
  for(params in req.body){
    var myData = JSON.parse(params);
  }
  console.log(myData);
  console.log(myData.ip);
*/

  res.render('index', data);
});

module.exports = router;
