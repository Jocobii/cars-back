const express = require('express');

const router = express.Router();

router.get('/', async (_req, res) => {
  res.send('Hello world from server');
});

router.use('/cars', require('./routes/cars'));

module.exports = router;
