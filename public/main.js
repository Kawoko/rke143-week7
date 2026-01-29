async function fetchRandomRecipe() {
  const titleEl = document.getElementById('recipe-title');
  const imageEl = document.getElementById('recipe-image');
  const ingredientsEl = document.getElementById('ingredient-list');
  const instructionsEl = document.getElementById('recipe-instructions');

  titleEl.textContent = 'Loading recipe...';
  instructionsEl.textContent = '';
  ingredientsEl.innerHTML = '';
  imageEl.removeAttribute('src');

  try {
    const res = await fetch('/random');
    if (!res.ok) {
      titleEl.textContent = 'Could not load recipe';
      return;
    }

    const data = await res.json();
    const recipe = data.recipe || {};
    const ingredients = data.ingredients || [];

    titleEl.textContent = recipe.recipename || 'Unknown recipe';

    instructionsEl.textContent = (recipe.instructions || 'No instructions available.')
  .replace(/<br\s*\/?>/gi, '\n');

    const imageUrl = recipe.imageurl || recipe.imageUrl || 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=1200';
    imageEl.src = imageUrl;
    imageEl.alt = recipe.recipename || 'Recipe image';

    ingredientsEl.innerHTML = '';
    if (ingredients.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No ingredients listed.';
      ingredientsEl.appendChild(li);
    } else {
      for (const name of ingredients) {
        const li = document.createElement('li');
        li.textContent = name;
        ingredientsEl.appendChild(li);
      }
    }
  } catch (err) {
    console.error('Error fetching random recipe:', err);
    titleEl.textContent = 'Error loading recipe';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('shuffle-btn');
  btn.addEventListener('click', fetchRandomRecipe);

  fetchRandomRecipe();
});
