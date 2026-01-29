const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/', async (req, res) => {
	try {
		const result = await db.query('SELECT * FROM ingredient');
		return res.json(result.rows);
	} catch (err) {
		console.error('Error querying ingredients:', err);
		return res.status(500).send('Error fetching ingredients');
	}
});

module.exports = router;
