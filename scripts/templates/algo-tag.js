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

function searchAlgo(recipes) {
    function performSearch() {
        const searchTerm = searchBar.value.trim().toLowerCase();
        
        if (searchTerm === "") {
            filteredRecipes = recipes;
        } else if (searchTerm.length <= 3) {
            return;
        } else {
            filteredRecipes = [];
            for (let i = 0; i < recipes.length; i++) {
                const recipe = recipes[i];
                const searchTermLowerCase = searchTerm.toLowerCase();
                
                if (
                    recipe.name.toLowerCase().includes(searchTermLowerCase) ||
                    recipe.description.toLowerCase().includes(searchTermLowerCase) ||
                    recipe.appliance.toLowerCase().includes(searchTermLowerCase)
                ) {
                    filteredRecipes.push(recipe);
                } else {
                    let ingredientMatch = false;
                    for (let j = 0; j < recipe.ingredients.length; j++) {
                        const ingredient = recipe.ingredients[j].ingredient.toLowerCase();
                        if (ingredient.includes(searchTermLowerCase)) {
                            ingredientMatch = true;
                            break;
                        }
                    }
                    if (ingredientMatch) {
                        filteredRecipes.push(recipe);
                    } else {
                        let ustensilsMatch = false;
                        for (let k = 0; k < recipe.ustensils.length; k++) {
                            const ustensil = recipe.ustensils[k].toLowerCase();
                            if (ustensil.includes(searchTermLowerCase)) {
                                ustensilsMatch = true;
                                break;
                            }
                        }
                        if (ustensilsMatch) {
                            filteredRecipes.push(recipe);
                        }
                    }
                }
            }
        }

        galleryContainer.innerHTML = '';

        if (filteredRecipes.length === 0) {
            // Aucun résultat trouvé
            searchElement.textContent = searchBar.value;
            searchNoResults.style.display = 'block';
        } else {
            searchNoResults.style.display = 'none';
            currentRecipes = filteredRecipes;
            updateRecipeCount(currentRecipes.length);
            updateListsRecipes(currentRecipes);
            displayRecipes(currentRecipes);
        }
    }

    // Ajoutez un gestionnaire d'événements à la barre de recherche pour déclencher la recherche
    searchBar.addEventListener('input', performSearch);

    // Ajoutez un gestionnaire d'événements pour réinitialiser la liste des recettes lorsque le champ de recherche est vidé
    searchBar.addEventListener('change', function() {
        if (searchBar.value.trim() === "") {
            filteredRecipes = recipes;
            galleryContainer.innerHTML = '';
            displayRecipes(filteredRecipes);
        }
    });
}

// Fonction qui permet de créer une liste deroulantes pour les ingredients, ustensilles et appareils
function createListItems(items, listElement) {
    // Création d'un objet pour stocker les éléments sans répétition
    var noRepeatItems = {};

    // Remplissage de l'objet noRepeatItems avec des éléments uniques
    for (var i = 0; i < items.length; i++) {
        var item = items[i].toLowerCase();
        noRepeatItems[item] = true;
    }

    // Parcours des éléments uniques
    for (item in noRepeatItems) {
        // Création de l'élément de liste
        var listItem = document.createElement('li');
        listItem.textContent = item;
        listElement.appendChild(listItem);

        // Ajout de l'événement de clic
        listItem.onclick = (function(itemCopy) {
            return function() {
                if (!selectedItems.has(itemCopy)) {
                    createIngredientLabel(itemCopy);
                    selectedItems.add(itemCopy);
                    filterRecipesByIngredient();
                }
            };
        })(item);
    }
}

function filterRecipesByIngredient() {
    console.time("durée ex");
    const searchNoResults = document.querySelector(".search-no-results");
    filteredRecipes = [];
    
    if (selectedItems.size === 0) {
        filteredRecipes = currentRecipes;
    } else {
        for (let i = 0; i < currentRecipes.length; i++) {
            let recipe = currentRecipes[i];
            let recipeMatches = true;

            for (let tag of selectedItems) {
                if (!collectIngredients(recipe).includes(tag) &&
                    !collectUstensiles(recipe).includes(tag) &&
                    !collectAppliance(recipe).includes(tag)) {
                    recipeMatches = false;
                    break;
                }
            }

            if (recipeMatches) {
                filteredRecipes.push(recipe);
            }
        }
    }

    galleryContainer.innerHTML = "";

    if (filteredRecipes.length > 0) {
        searchNoResults.style.display = "none";
        updateRecipeCount(filteredRecipes.length);
        updateListsRecipes(filteredRecipes);
        displayRecipes(filteredRecipes);
    } else {
        console.log("pas de recette !");
    }
    console.timeEnd("durée ex");
    console.log("stop");
}