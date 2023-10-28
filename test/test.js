function searchBarSecond(recipes) {
    const ingredientsList = document.querySelector('.list-ingredients');
    const applianceList = document.querySelector('.list-appliance');
    const utensilsList = document.querySelector('.list-ustensils');
    const galleryContainer = document.querySelector('.gallery-recipes');

    let filters = {
        ingredients: new Set(),
        appliances: new Set(),
        utensils: new Set()
    };

    displayListItems(recipes);

    function displayListItems(recipesToShow) {
        const allIngredients = [...new Set(recipesToShow.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())))];
        const allAppliances = [...new Set(recipesToShow.map(recipe => recipe.appliance.toLowerCase()))];
        const allUtensils = [...new Set(recipesToShow.flatMap(recipe => recipe.ustensils.map(utensil => utensil.toLowerCase())))];

        // Clear the existing lists
        ingredientsList.innerHTML = '';
        applianceList.innerHTML = '';
        utensilsList.innerHTML = '';

        createListItems(allIngredients, ingredientsList, 'ingredients');
        createListItems(allAppliances, applianceList, 'appliances');
        createListItems(allUtensils, utensilsList, 'ustensils');
    }

    function createListItems(items, listElement, filterType) {
        items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            listElement.appendChild(listItem);

            listItem.addEventListener('click', () => {
                filters[filterType].add(item);
                filterAndDisplayRecipes();
            });
        });
    }

    function filterAndDisplayRecipes() {
        const filteredRecipes = recipes.filter(recipe => {
            return (
                [...filters.ingredients].every(ingredient => recipe.ingredients.some(ing => ing.ingredient.toLowerCase() === ingredient)) &&
                filters.appliances.has(recipe.appliance.toLowerCase()) &&
                [...filters.ustensils].every(utensil => recipe.ustensils.some(ut => ut.toLowerCase() === utensil))
            );
        });

        galleryContainer.innerHTML = ""; // Clear the existing recipes (You should later add a function to display the actual recipes)
        displayListItems(filteredRecipes);
    }
}