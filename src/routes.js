const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  const title = 'Heimasíðan okkar';
  const data = { title };
  res.render('index', data);
});

router.post('/', (req, res, next) => {
  const title = 'Niðurstöður margföldunar';
  const data = { title };
  res.render('index', data);
});

module.exports = router;
