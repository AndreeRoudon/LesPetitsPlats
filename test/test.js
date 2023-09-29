// Fonction pour charger les recettes
async function getRecipes() {
    const response = await fetch('./data/recipes.json');
    const data = await response.json();
    const recettes = data.recipes;

    // Affichez les recettes dans des cartes
    displayRecipes(recettes);

    // Sélectionnez l'élément HTML nécessaire pour la recherche
    const searchBar = document.querySelector('.header__research--bar');

    // Fonction pour effectuer la recherche
    function performSearch() {
        const searchTerm = searchBar.value.trim().toLowerCase();
        if (searchTerm.length >= 3) {
            const filteredRecipes = recettes.filter(recipe => {
                const recipeName = recipe.name.toLowerCase();
                return recipeName.includes(searchTerm);
            });
            // Affichez les recettes filtrées dans des cartes
            displayRecipes(filteredRecipes);
        } else {
            // Effacez le contenu si la longueur du terme de recherche est inférieure à 3 caractères
            displayRecipes(recettes);
        }
    }

    // Ajoutez un écouteur d'événement à la barre de recherche pour déclencher la recherche
    searchBar.addEventListener('input', performSearch);
}

// Fonction de recherche principale
function searchBarPrincipal() {
    // Sélectionnez l'élément HTML nécessaire pour la recherche
    const searchBar = document.querySelector('.header__research--bar');

    // Fonction pour effectuer la recherche
    function performSearch() {
        const searchTerm = searchBar.value.trim().toLowerCase();
        // Mettez ici votre logique de recherche principale
    }

    // Ajoutez un écouteur d'événement à la barre de recherche pour déclencher la recherche
    searchBar.addEventListener('input', performSearch);
}