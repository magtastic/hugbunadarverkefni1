const express = require('express');
const router = express.Router();
const dataHandler = require("./lib/dataHandler.js");
const bodyParser = require('body-parser');


router.use(bodyParser.json());

router.get('/', dataHandler.searchEvents, (req, res, next) => {
  const title = 'Heimasíðan okkar';
  const data = { title };
  console.log(req.value);
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
  console.log("Hér var kallað á /ip með post úr main.js");
  console.log();
  res.render('index', data);
});

module.exports = router;
