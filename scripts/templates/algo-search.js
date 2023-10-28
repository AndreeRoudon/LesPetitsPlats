// Fonction de recherche principale
function searchBarPrincipal(recipes) {
    // Sélectionnez l'élément HTML nécessaire pour la recherche
    const ingredientsList = document.querySelector('.list-ingredients');
    const applianceList = document.querySelector('.list-appliance');
    const utensilsList = document.querySelector('.list-ustensils');
    const searchBar = document.querySelector('.header__research--bar');
    const galleryContainer = document.querySelector('.gallery-recipes');
    const searchNoResults = document.querySelector('.search-no-results');
    const searchElement = document.querySelector('.search-element');

    const allIngredients = recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient));
    const allAppliances = recipes.map(recipe => recipe.appliance);
    const allUtensils = recipes.flatMap(recipe => recipe.ustensils);

    createListItems(allIngredients, ingredientsList);
    createListItems(allAppliances, applianceList);
    createListItems(allUtensils, utensilsList);

    // Fonction pour effectuer la recherche
    function performSearch() {
        const searchTerm = searchBar.value.trim().toLowerCase();

        if (searchTerm.length >= 3) {
            // Filtrer les recettes qui correspondent au terme de recherche
            const filteredRecipes = recipes.filter(recipe => {
                return (
                    recipe.name.toLowerCase().includes(searchTerm) ||
                    recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchTerm)) ||
                    recipe.description.toLowerCase().includes(searchTerm) ||
                    recipe.appliance.toLowerCase().includes(searchTerm) ||
                    recipe.ustensils.some(ustensils => ustensils.toLowerCase().includes(searchTerm))
                );
            });
            // Effacer les recettes actuellement affichées
            galleryContainer.innerHTML = '';

            if (filteredRecipes.length === 0) {
                // Aucun résultat trouvé, afficher le message avec le terme de recherche
                searchElement.textContent = searchBar.value;
                searchNoResults.style.display = 'block';
            } else {
                // Masquer le message s'il y a des résultats et Afficher les recettes filtrées
                searchNoResults.style.display = 'none';
                displayRecipes(filteredRecipes);
                currentRecipes = filteredRecipes;
                updateRecipeCount(currentRecipes.length);
                updateListsRecipes();
            }

        } else {
            // Effacer les recettes actuellement affichées
            galleryContainer.innerHTML = '';
            searchNoResults.style.display = 'none';
            displayRecipes(recipes);
        }
    }
    function updateRecipeCount(count) {
        const recipeCountElement = document.querySelector('.nb-recipes');
        if (count < 50) {
            recipeCountElement.textContent = count;
        } else {
            recipeCountElement.textContent = 1500;
        }
    }

    // Ajoutez un écouteur d'événement à la barre de recherche pour déclencher la recherche
    searchBar.addEventListener('input', performSearch);

    // Fonction qui permet de créer une liste deroulantes pour les ingredients, ustensilles et appareils
    function createListItems(items, listElement) { // paramètre (objets liste, element Html)
        listElement.innerHTML = '';
        const noRepeatItems = new Set(); // stock les élements des recettes pour éviter les repetitions dans la liste
        items.forEach(elem => {
            let item = elem.toLowerCase();
            if (!noRepeatItems.has(item)) {
                const listItem = document.createElement('li');
                listItem.textContent = item;
                listElement.appendChild(listItem);
                noRepeatItems.add(item);
            }
        });
    }
    //fonction qui permet de mettre à jour la liste
    function updateListsRecipes() {
        ingredientsList.innerHTML = '';
        applianceList.innerHTML = '';
        utensilsList.innerHTML = '';

        const updatedIngredients = currentRecipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient));
        const updatedAppliances = currentRecipes.map(recipe => recipe.appliance);
        const updatedUtensils = currentRecipes.flatMap(recipe => recipe.ustensils);

        createListItems(updatedIngredients, ingredientsList);
        createListItems(updatedAppliances, applianceList);
        createListItems(updatedUtensils, utensilsList);
    }
}