const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/', async (req, res) => {
	try {
		const query = `
			SELECT a.id AS recipeid,
			       a.recipename,
				   a.instructions,
			       b.ingredientname
			FROM recipe a
			INNER JOIN ingredientinrecipe c ON a.id = c.recipeid
			INNER JOIN ingredient b ON b.id = c.ingredientid;
		`;

		const result = await db.query(query);

		const recipeMap = {};
		for (const row of result.rows) {
			const { recipeid, recipename, instructions, ingredientname } = row;

			if (!recipeMap[recipeid]) {
				recipeMap[recipeid] = {
					recipeName: recipename,
					instructions: instructions,
					ingredients: []
				};
			}

			recipeMap[recipeid].ingredients.push(ingredientname);
		}

		const recipesArray = Object.values(recipeMap);
		return res.json(recipesArray);
	} catch (err) {
		console.error('Error querying full recipes:', err);
		return res.status(500).send('Error fetching full recipes');
	}
});

router.get('/recipeingredients', async (req, res) => {
    const recipes = await db.query('SELECT a.recipeName, b.ingredientName FROM recipe a INNER JOIN IngredientInRecipe c ON a.id = c.recipeId INNER JOIN ingredient b ON b.id = c.ingredientId;');  
    const recipeMap = {};

    for(const item of recipes.rows) {
        const {recipename, ingredientname} = item;
        if(!recipeMap[recipename]) {
            recipeMap[recipename] = [];
        }

        recipeMap[recipename].push(ingredientname);
    }
    res.json(recipeMap);
});

router.get('/search', async (req, res) => {
	try {
		const searchName = req.query.recipeName;
		if (!searchName) {
			return res.status(400).send('Missing recipeName query parameter');
		}

		const query = `
			SELECT a.id AS recipeid,
			       a.recipename,
			   	   a.instructions,
			       b.ingredientname
			FROM recipe a
			INNER JOIN ingredientinrecipe c ON a.id = c.recipeid
			INNER JOIN ingredient b ON b.id = c.ingredientid
			WHERE a.recipename = $1;
		`;

		const result = await db.query(query, [searchName]);

		const recipeMap = {};
		for (const row of result.rows) {
			const { recipeid, recipename, instructions, ingredientname } = row;

			if (!recipeMap[recipeid]) {
				recipeMap[recipeid] = {
					recipeName: recipename,
					instructions: instructions,
					ingredients: []
				};
			}

			recipeMap[recipeid].ingredients.push(ingredientname);
		}

		const recipesArray = Object.values(recipeMap);
		return res.json(recipesArray);
	} catch (err) {
		console.error('Error searching full recipes:', err);
		return res.status(500).send('Error searching full recipes');
	}
});

module.exports = router;
