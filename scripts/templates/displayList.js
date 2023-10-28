function searchBarSecond(recipes) {
    const ingredientsList = document.querySelector('.list-ingredients');
    const applianceList = document.querySelector('.list-appliance');
    const utensilsList = document.querySelector('.list-ustensils');
    const galleryContainer = document.querySelector('.gallery-recipes');

    const selectedItems = new Set();


    const allIngredients = recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient));
    const allAppliances = recipes.map(recipe => recipe.appliance);
    const allUtensils = recipes.flatMap(recipe => recipe.ustensils);

    createListItems(allIngredients, ingredientsList);
    createListItems(allAppliances, applianceList);
    createListItems(allUtensils, utensilsList);

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

                // Lorsque l'utilisateur selectionne un élément de la liste
                listItem.addEventListener('click', () => {
                    createIngredientLabel(item);
                    selectedItems.add(item);
                    filterRecipesByIngredient();
                });
            }
        });
    }

    function filterRecipesByIngredient() {
        const searchNoResults = document.querySelector(".search-no-results");
        let filteredRecipes = new Set(recipes);
        selectedItems.forEach((tag) => {
            foundedRecipes = recipes.filter((recipe) => {
                if (collectIngredients(recipe).includes(tag) ||
                    collectUstensiles(recipe).includes(tag) ||
                    collectAppliance(recipe).includes(tag))
                    return recipe;
            });
            filteredRecipes = new Set(
                [...foundedRecipes].filter((recipe) => filteredRecipes.has(recipe))
            );
        });

        galleryContainer.innerHTML = "";

        if (filteredRecipes.size > 0) {
            searchNoResults.style.display = "none";
            currentRecipes = [...filteredRecipes]; // prend tous les élements du tableau filteredRecipes et les transfert dans currentRecipes
            updateRecipeCount(currentRecipes.length);
            updateListsRecipes();
            displayRecipes(filteredRecipes);
        } else {
            console.log("error");
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

    function createIngredientLabel(ingredient) {
        const labelContainer = document.querySelector('.label-search');

        const ingredientLabel = document.createElement('div');
        const ingredientSpan = document.createElement('span');
        const closeLabel = document.createElement('div');

        ingredientLabel.classList.add('ingredient-label');
        closeLabel.classList.add('close-label');

        closeLabel.addEventListener('click', () => {
            selectedItems.delete(ingredient);
            ingredientLabel.remove();
            filterRecipesByIngredient();
        });

        ingredientSpan.textContent = ingredient;

        ingredientLabel.appendChild(ingredientSpan);
        ingredientLabel.appendChild(closeLabel);

        labelContainer.appendChild(ingredientLabel);
    }
}




function collectIngredients(recipe) {
    const ingredients = new Set();

    for (let item of recipe.ingredients) {
        ingredients.add(item.ingredient.toLowerCase());
    }
    return [...ingredients];
}

function collectUstensiles(recipe) {
    const ustensiles = new Set();

    for (let item of recipe.ustensils) {
        ustensiles.add(item.toLowerCase());
    }
    return [...ustensiles];
}

function collectAppliance(recipe) {
    return recipe.appliance.toLowerCase();
}

// Sélectionnez tous les éléments avec la class "pointer"
const pointerElements = document.querySelectorAll('.pointer');

function handlePointerClick(event) {
    event.stopPropagation();  // arrêt de la propagation de l'événement

    const pointer = event.currentTarget;
    const arrow = pointer.querySelector('.arrow');
    const displayList = pointer.nextElementSibling;

    closeAllLists();  // Ferme toutes les listes avant d'ouvrir celle-ci
    displayList.classList.add('open');
    arrow.style.transform = "rotate(135deg)";
    arrow.style.bottom = "-3px";
}

// Ajoutez un écouteur d'événement de click à chaque élément "pointer"
pointerElements.forEach(pointer => {
    pointer.addEventListener('click', handlePointerClick);
});

function closeAllLists() {
    pointerElements.forEach(pointer => {
        const arrow = pointer.querySelector('.arrow');
        const displayList = pointer.nextElementSibling;
        if (displayList.classList.contains('open')) {
            displayList.classList.remove('open');
            arrow.style.transform = "rotate(-45deg)";
            arrow.style.bottom = "3px";
        }
    });
}

document.addEventListener('click', function (event) {
    let clickedInsideList = false;
    pointerElements.forEach(pointer => {
        if (pointer.contains(event.target) || pointer.nextElementSibling.contains(event.target)) {
            clickedInsideList = true;
        }
    });

    if (!clickedInsideList) {
        closeAllLists();
    }
});

// rercheche principal filtrer la liste des tags
// a la supression d'un tag verifier si il ya element dans la barre de recherche, appliquer et filtrer si il y a encore un element dans tab