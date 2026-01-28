const express = require('express');
const router = express.Router();

const countriesData = require('../data/countries.json');

router.get('/', (req, res) => {
  res.json(countriesData);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return res.status(400).send('Invalid ID');
  }
  
  const country = countriesData.countries.find(c => c.id === id);
  
  if (!country) {
    return res.status(404).send('Country not found');
  }
  
  res.json(country);
});

module.exports = router;
