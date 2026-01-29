const express = require('express');

//Routes
const rkeRouter = require('./routes/rke143');
const countriesRouter = require('./routes/countries');
const recipesRouter = require('./routes/recipes');
const ingredientsRouter = require('./routes/ingredients');
const fullRecipesRouter = require('./routes/fullrecipes');
const randomRouter = require('./routes/random');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
	res.send('RKE143 Server is running');
});

app.use('/rke143', rkeRouter);
app.use('/countries', countriesRouter);
app.use('/recipes', recipesRouter);
app.use('/ingredients', ingredientsRouter);
app.use('/fullrecipes', fullRecipesRouter);
app.use('/random', randomRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
