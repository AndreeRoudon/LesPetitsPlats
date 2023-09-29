function displayRecipes(recipes){
    const galleryContainer = document.querySelector('.gallery-recipes');

    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('article');
        recipeDiv.classList.add('recipe-card');

        const recipeImage = document.createElement('img');
        recipeImage.src = `assets/images/recettes/${recipe.image}`;
        recipeImage.alt = recipe.name;

        const recipeTime = document.createElement('span');
        recipeTime.classList.add('time');
        recipeTime.textContent = `${recipe.time}min`;

        const contentText = document.createElement('div');
        contentText.classList.add('description');

        const recipeTitle = document.createElement('h2');
        recipeTitle.textContent = recipe.name;

        const descriptionTitle = document.createElement('h3');
        descriptionTitle.textContent = "recette";

        const descriptionParag = document.createElement('p');
        descriptionParag.textContent = recipe.description;

        const ingredientTitle = document.createElement('h3');
        ingredientTitle.textContent = "ingredients";

        const ingredients = document.createElement('div');
        ingredients.classList.add('ingredients');

        recipe.ingredients.forEach(ingredient => {
            const ingredientItem = document.createElement('aside')
            const ingredientH4 = document.createElement('h4');
            ingredientH4.textContent = `${ingredient.ingredient}`;
            const ingredientSpan = document.createElement('span');
            ingredientSpan.textContent = `${ingredient.quantity || '-'} ${ingredient.unit || ''}`;
            ingredients.appendChild(ingredientItem);
            ingredientItem.appendChild(ingredientH4);
            ingredientItem.appendChild(ingredientSpan);
        });

        recipeDiv.appendChild(recipeImage);
        recipeDiv.appendChild(contentText);
        recipeDiv.appendChild(recipeTime);

        contentText.appendChild(recipeTitle);
        contentText.appendChild(descriptionTitle);
        contentText.appendChild(descriptionParag);
        contentText.appendChild(ingredientTitle);
        contentText.appendChild(ingredients);

        galleryContainer.appendChild(recipeDiv);
    });
}
