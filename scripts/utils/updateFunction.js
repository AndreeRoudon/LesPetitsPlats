// Fonction qui permet de mettre à jour la compteur de recettes afficher
function updateRecipeCount(count) {
    const recipeCountElement = document.querySelector('.nb-recipes');
    recipeCountElement.textContent = count;
}

// Fonction qui permet de mettre à jour la liste deroulante des ingredients, ustensiles et appareils
function updateListsRecipes(recipes) {
    ingredientsList.innerHTML = '';
    applianceList.innerHTML = '';
    utensilsList.innerHTML = '';

    let updatedIngredients = [];
    let updatedAppliances = [];
    let updatedUtensils = [];

    for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
            updatedIngredients.push(recipes[i].ingredients[j].ingredient);
        }
    }

    for (let i = 0; i < recipes.length; i++) {
        updatedAppliances.push(recipes[i].appliance);
    }

    for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ustensils.length; j++) {
            updatedUtensils.push(recipes[i].ustensils[j]);
        }
    }

    createListItems(updatedIngredients, ingredientsList);
    createListItems(updatedAppliances, applianceList);
    createListItems(updatedUtensils, utensilsList);
}