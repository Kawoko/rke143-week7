const express = require('express');
const router = express.Router();

const db = require('../db');

//Get all recipes
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM recipe;');
    return res.json(result.rows);
  } catch (err) {
    console.error('Error querying recipes:', err);
    return res.status(500).send('Error fetching recipes');
  }
});

// Add new recipe if it does not exist
router.post('/', async (req, res) => {
  const { recipename } = req.body;

  const data = await db.query('SELECT * FROM recipe WHERE recipename = $1;', [recipename]);

  if (data.rows.length !== 0) {
    res.json({ message: 'recipe already exists' });
  } else {
    try {
      const result = await db.query('INSERT INTO recipe (recipename) VALUES ($1);', [recipename]);
      res.status(200).json({ message: `${result.rowCount} row was added.` });
    } catch (error) {
      console.log(error);
    }
  }
});

// Update recipe instructions
router.put('/', async (req, res) => {
  const { recipename, instructions } = req.body;
  const data = await db.query('SELECT * FROM recipe WHERE recipename = $1;', [recipename]);

  if (data.rows.length === 0) {
    res.json({ message: 'there no such recipe' });
  } else {
    try {
      const result = await db.query(
        'UPDATE recipe SET instructions = $1 WHERE recipename = $2;',
        [instructions, recipename]
      );
      res.status(200).json({ message: `${result.rowCount} row was updated.` });
    } catch (error) {
      console.log(error);
    }
  }
});

// Delete recipe
router.delete('/', async (req, res) => {
  const { recipename } = req.body;
  const data = await db.query('SELECT * FROM recipe WHERE recipename = $1;', [recipename]);

  if (data.rows.length === 0) {
    res.json({ message: 'there no such recipe' });
  } else {
    try {
      const result = await db.query('DELETE FROM recipe WHERE recipename = $1;', [recipename]);
      res.status(200).json({ message: `${result.rowCount} row was deleted.` });
    } catch (error) {
      console.log(error);
    }
  }
});

router.post('/addingredientinrecipe', async (req, res) => {
  const { recipename, ingredientname } = req.body;

  const data = await db.query(
    'SELECT a.recipename, b.ingredientname FROM recipe a INNER JOIN ingredientinrecipe c ON a.id = c.recipeid INNER JOIN ingredient b ON b.id = c.ingredientid WHERE a.recipename = $1 AND b.ingredientname = $2;',
    [recipename, ingredientname]
  );

  if (data.rows.length !== 0) {
    res.json({ message: 'record already exists' });
  } else {
    try {
      const result = await db.query(
        'INSERT INTO ingredientinrecipe (recipeid, ingredientid) SELECT a.id, b.id FROM recipe a JOIN ingredient b ON a.recipename = $1 AND b.ingredientname = $2;',
        [recipename, ingredientname]
      );
      res.status(200).json({ message: `${result.rowCount} row was added.` });
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = router;
