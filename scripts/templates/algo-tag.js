// Elément HTML nécessaire pour la recherche
const searchBar = document.querySelector('.header__research--bar');
const searchNoResults = document.querySelector('.search-no-results');
const searchElement = document.querySelector('.search-element');

const ingredientsList = document.querySelector('.list-ingredients');
const applianceList = document.querySelector('.list-appliance');
const utensilsList = document.querySelector('.list-ustensils');

const galleryContainer = document.querySelector('.gallery-recipes');

// On crée un tableau qui stock les tags
const selectedItems = new Set();
let currentRecipes = [];
let filteredRecipes;

getRecipes().then(recipes => {
    currentRecipes = recipes;
    const allIngredients = currentRecipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient));
    const allAppliances = currentRecipes.map(recipe => recipe.appliance);
    const allUtensils = currentRecipes.flatMap(recipe => recipe.ustensils);

    createListItems(allIngredients, ingredientsList);
    createListItems(allAppliances, applianceList);
    createListItems(allUtensils, utensilsList);
});

// Fonction de recherche principale
function searchAlgo(recipes) {
    // Fonction pour effectuer la recherche
    function performSearch() {
        const searchTerm = searchBar.value.trim().toLowerCase();
        if (searchTerm === 0) {
            galleryContainer.innerHTML = '';
            searchNoResults.style.display = 'none';
            displayRecipes(recipes);
        }
        if (searchTerm <= 3) {
            return;
        }
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
            updateListsRecipes(currentRecipes);
            displayRecipes(currentRecipes);
        }
    }

    // Ajoutez un écouteur d'événement à la barre de recherche pour déclencher la recherche
    searchBar.addEventListener('input', performSearch);
}

// Fonction qui permet de créer une liste deroulantes pour les ingredients, ustensilles et appareils
function createListItems(items, listElement) { // paramètre (objets liste, element Html)
    const noRepeatItems = [...new Set(items)]; // stock les élements des recettes pour éviter les repetitions dans la liste
    noRepeatItems.forEach(elem => {
        let item = elem.toLowerCase();
        const listItem = document.createElement('li');
        listItem.textContent = item;
        listElement.appendChild(listItem);

        // Lorsque l'utilisateur selectionne un élément de la liste
        listItem.addEventListener('click', () => {
            if (!selectedItems.has(item)) {
                createIngredientLabel(item);
                selectedItems.add(item);
                filterRecipesByIngredient();
            }
        });
    });
}

function filterRecipesByIngredient() {
    const searchNoResults = document.querySelector(".search-no-results");
    filteredRecipes = currentRecipes;
    selectedItems.forEach((tag) => {
        const foundedRecipes = filteredRecipes.filter((recipe) => {
            if (collectIngredients(recipe).includes(tag) ||
                collectUstensiles(recipe).includes(tag) ||
                collectAppliance(recipe).includes(tag))
                return recipe;
        });
        filteredRecipes = foundedRecipes;
    });
    // console.time
    galleryContainer.innerHTML = "";
    if (selectedItems.size === 0) {
        displayRecipes(currentRecipes);
    }
    if (filteredRecipes.length > 0) {
        searchNoResults.style.display = "none";
        updateRecipeCount(filteredRecipes.length);
        updateListsRecipes(filteredRecipes);
        displayRecipes(filteredRecipes);
    } else {
        console.log("pas de recette !");
    }
}