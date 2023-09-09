// Fonction de recherche principale
function searchBarPrincipal(recettes) {
    // Sélectionnez l'élément HTML nécessaire pour la recherche
    const searchBar = document.querySelector('.header__research--bar');
    const galleryContainer = document.querySelector('.gallery-recipes');

    // Fonction pour effectuer la recherche
    function performSearch() {
        const searchTerm = searchBar.value.trim().toLowerCase();

        if (searchTerm.length >= 3) {
            // Filtrer les recettes qui correspondent au terme de recherche
            const filteredRecipes = recettes.filter(recipe => {
                return (
                    recipe.name.toLowerCase().includes(searchTerm) ||
                    recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchTerm)) ||
                    recipe.description.toLowerCase().includes(searchTerm)
                    // Vous pouvez ajouter plus de conditions de recherche ici si nécessaire
                );
            });

            // Effacer les recettes actuellement affichées
            galleryContainer.innerHTML = '';

            // Afficher les recettes filtrées
            displayRecipes(filteredRecipes);
        } else {
            // Effacer les recettes actuellement affichées
            galleryContainer.innerHTML = '';
            displayRecipes(recettes);
        }
    }

    // Ajoutez un écouteur d'événement à la barre de recherche pour déclencher la recherche
    searchBar.addEventListener('input', performSearch);
}


