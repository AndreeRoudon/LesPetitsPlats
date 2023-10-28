function searchBarSecond(recipes) {
    const ingredientsList = document.querySelector('.list-ingredients');
    const applianceList = document.querySelector('.list-appliance');
    const utensilsList = document.querySelector('.list-ustensils');
    const galleryContainer = document.querySelector('.gallery-recipes');
    const selectedIngredients = new Set();

    const allIngredients = recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient));
    const allAppliances = recipes.map(recipe => recipe.appliance);
    const allUtensils = recipes.flatMap(recipe => recipe.ustensils);

    createListItems(allIngredients, ingredientsList);
    createListItems(allAppliances, applianceList);
    createListItems(allUtensils, utensilsList);

    let currentRecipes = recipes;

    // Fonction qui permet de créer une liste deroulantes pour les ingredients, ustensilles et appareils
    function createListItems(items, listElement) {
        const seenItems = new Set();
        items.forEach(item => {
            if (!seenItems.has(item)) {
                const listItem = document.createElement('li');
                listItem.textContent = item;
                listElement.appendChild(listItem);
                seenItems.add(item);

                // Lorsque l'utilisateur selectionne un élément de la liste
                listItem.addEventListener('click', () => {
                    const ingredient = item.toLowerCase();
                    createIngredientLabel(ingredient);
                    filterRecipesByIngredient();
                    filterListRecipes(ingredient);
                    selectedIngredients.add(ingredient);
                });
            }
        });
        /*
        // Cette fonction filtre les recettes par ingrédient et les stocke dans currentRecipes
        function filterListRecipes(ingredient) {
            currentRecipes = recipes.filter(recipe =>
                recipe.ingredients.some(ing => ing.ingredient.toLowerCase() === ingredient)
            );
            console.log(currentRecipes);
        }

        // Cette fonction met à jour la liste des ingrédients en fonction des recettes actuellement stockées dans currentRecipes
        function updateIngredientListByRecipes(filteredRecipes) { // parametre des recettes filtre
            console.log(filteredRecipes);
            const allIngredients = filteredRecipes.map(recipe =>
                recipe.ingredients.map(ingredient => ingredient.ingredient)
            );

            // Clear the existing list
            const ingredientsList = document.querySelector('.list-ingredients');
            ingredientsList.innerHTML = '';

            // Add the ingredients from the current recipes
            createListItems(allIngredients, ingredientsList);
        }
        */

        function filterRecipesByIngredient() {
            const searchNoResults = document.querySelector(".search-no-results");
            const searchElement = document.querySelector(".search-element");
            let filteredRecipes = new Set(recipes);
            selectedIngredients.forEach((tag) => {
                tag = tag.toLowerCase();
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
            console.log(filteredRecipes);
            galleryContainer.innerHTML = "";

            if (filteredRecipes.length === 0) {
                console.log("rien");
            } else {
                searchNoResults.style.display = "none";
                updateIngredientListByRecipes(filteredRecipes);
                displayRecipes(filteredRecipes);
            }
        }
        
        // Fonction pour créer un élément d'ingrédient
        function createIngredientLabel(ingredient) {
            const labelContainer = document.querySelector('.label-search');

            const ingredientLabel = document.createElement('div');
            const ingredientSpan = document.createElement('span');
            const closeLabel = document.createElement('div');

            ingredientLabel.classList.add('ingredient-label');
            closeLabel.classList.add('close-label');

            closeLabel.addEventListener('click', () => {
                selectedIngredients.delete(ingredient);
                ingredientLabel.remove();
                filterRecipesByIngredient();
            });

            ingredientSpan.textContent = ingredient;

            ingredientLabel.appendChild(ingredientSpan);
            ingredientLabel.appendChild(closeLabel);

            labelContainer.appendChild(ingredientLabel);
        }
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