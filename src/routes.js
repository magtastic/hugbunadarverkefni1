const express = require('express');
const dataHandler = require('./lib/dataHandler.js');
const dataFetcher = require('./lib/dataFetcher.js');

const router = express.Router();

router.get('/', dataFetcher.getAuthToken, dataHandler.getLocationByIP,
dataFetcher.searchEvents, dataHandler.setFBEvents, (req, res, next) => {
  const title = 'Eventually';
  const events = res.locals.events;
  const data = { title, events };
  res.render('index', data);
});

router.get('/search', (req, res, next) => {
  const latAndLng = req.query.searchString.split(',');
  req.latitude = latAndLng[0];
  req.longitude = latAndLng[1];
  req.isSpecificSearching = true;
  next();
},
  dataFetcher.getAuthToken, dataFetcher.searchEvents,
  dataHandler.setFBEvents, (req, res, next) => {
    const title = 'Eventually';
    const events = res.locals.events;
    const data = { title, events };
    res.render('index', data);
  });

router.post('/', (req, res, next) => {
  const title = 'Eventually';
  const data = { title };
  res.render('index', data);
});

module.exports = router;
