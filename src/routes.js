const express = require('express');
const router = express.Router();
const dataFetcher = require("./lib/dataFetcher.js")

router.get('/', dataFetcher.getStuff, (req, res, next) => {
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

module.exports = router;
