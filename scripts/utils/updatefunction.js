// Fonction qui permet de mettre à jour la compteur de recettes afficher
function updateRecipeCount(count) {
    const recipeCountElement = document.querySelector('.nb-recipes');
    recipeCountElement.textContent = count;
}

//fonction qui permet de mettre à jour la liste
function updateListsRecipes(recipes) {
    ingredientsList.innerHTML = '';
    applianceList.innerHTML = '';
    utensilsList.innerHTML = '';

    const updatedIngredients = recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient));
    const updatedAppliances = recipes.map(recipe => recipe.appliance);
    const updatedUtensils = recipes.flatMap(recipe => recipe.ustensils);

    createListItems(updatedIngredients, ingredientsList);
    createListItems(updatedAppliances, applianceList);
    createListItems(updatedUtensils, utensilsList);
}