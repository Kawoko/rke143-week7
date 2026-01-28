const express = require('express');
const router = express.Router();

const rke143Data = require('../data/nodejs.json');

router.post('/', (req, res) => {
    const { name, code, nimi, kood } = req.body || {};

    const validName = name === 'rke' || nimi === 'rke';
    const validCode = code === '143' || kood === '143';

    if (!validName || !validCode) {
        return res.status(400).send('invalid credentials');
    }

    res.json(rke143Data);
});

module.exports = router;
