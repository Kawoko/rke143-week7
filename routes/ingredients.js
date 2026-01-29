const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/', async (req, res) => {
	try {
		const result = await db.query('SELECT * FROM ingredient;');
		return res.json(result.rows);
	} catch (err) {
		console.error('Error querying ingredients:', err);
		return res.status(500).send('Error fetching ingredients');
	}
});

router.post('/', async (req, res) => {
	const { ingredientname } = req.body;

	if (!ingredientname) {
		return res.status(400).json({ message: 'ingredientname is required' });
	}

	try {
		const existing = await db.query(
			'SELECT * FROM ingredient WHERE ingredientname = $1;',
			[ingredientname]
		);

		if (existing.rows.length !== 0) {
			return res.json({ message: 'ingredient already exists' });
		}

		const result = await db.query(
			'INSERT INTO ingredient (ingredientname) VALUES ($1);',
			[ingredientname]
		);
		return res
			.status(200)
			.json({ message: `${result.rowCount} row was added.` });
	} catch (err) {
		console.error('Error adding ingredient:', err);
		return res.status(500).send('Error adding ingredient');
	}
});

router.delete('/', async (req, res) => {
	const { ingredientname } = req.body;

	if (!ingredientname) {
		return res.status(400).json({ message: 'ingredientname is required' });
	}

	try {
		const existing = await db.query(
			'SELECT * FROM ingredient WHERE ingredientname = $1;',
			[ingredientname]
		);

		if (existing.rows.length === 0) {
			return res.json({ message: 'there is no such ingredient' });
		}

		const result = await db.query(
			'DELETE FROM ingredient WHERE ingredientname = $1;',
			[ingredientname]
		);
		return res
			.status(200)
			.json({ message: `${result.rowCount} row was deleted.` });
	} catch (err) {
		console.error('Error deleting ingredient:', err);
		return res.status(500).send('Error deleting ingredient');
	}
});

module.exports = router;
