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
					recipe: {
						id: recipeid,
						recipename: recipename,
						instructions: instructions
					},
					ingredients: []
				};
			}

			recipeMap[recipeid].ingredients.push(ingredientname);
		}

		const recipesArray = Object.values(recipeMap);
		if (recipesArray.length === 0) {
			return res.status(404).send('No recipes found');
		}

		const randomIndex = Math.floor(Math.random() * recipesArray.length);
		const randomRecipe = recipesArray[randomIndex];
		return res.json(randomRecipe);
	} catch (err) {
		console.error('Error fetching random full recipe:', err);
		return res.status(500).send('Error fetching random full recipe');
	}
});

module.exports = router;
