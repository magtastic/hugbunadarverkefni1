const express = require('express');
const dataHandler = require('./lib/dataHandler.js');
const dataFetcher = require('./lib/dataFetcher.js');

const router = express.Router();

router.get('/', dataFetcher.getAuthToken, dataHandler.getLocationByIP,
dataFetcher.searchEvents, dataHandler.setFBEvents,
dataHandler.filterEvents, (req, res, next) => {
  const title = 'Heimasíðan okkar';
  const events = res.locals.filterdEvents;
  const data = { title, events };
  res.render('index', data);
});

router.post('/', (req, res, next) => {
  const title = 'Niðurstöður margföldunar';
  const data = { title };
  res.render('index', data);
});

module.exports = router;
