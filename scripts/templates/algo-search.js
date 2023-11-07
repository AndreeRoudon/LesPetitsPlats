let filteredRecipes;

// Fonction de recherche principale
function searchBarPrincipal(recipes) {
    // Sélectionnez l'élément HTML nécessaire pour la recherche

    const searchBar = document.querySelector('.header__research--bar');
    const searchNoResults = document.querySelector('.search-no-results');
    const searchElement = document.querySelector('.search-element');

    // Fonction pour effectuer la recherche
    function performSearch() {
        const searchTerm = searchBar.value.trim().toLowerCase();

        if (searchTerm.length >= 3) {
            // Filtrer les recettes qui correspondent au terme de recherche
            filteredRecipes = recipes.filter(recipe => {
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
                currentRecipes = filteredRecipes;
                updateRecipeCount(currentRecipes.length);
                updateListsRecipes();
                displayRecipes(currentRecipes);
            }

        } else {
            // Effacer les recettes actuellement affichées
            galleryContainer.innerHTML = '';
            searchNoResults.style.display = 'none';
            displayRecipes(recipes);
        }
    }
    // Ajoutez un écouteur d'événement à la barre de recherche pour déclencher la recherche
    searchBar.addEventListener('input', performSearch);
}