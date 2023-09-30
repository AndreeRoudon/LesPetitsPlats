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

    function createListItems(items, listElement) {
        const seenItems = new Set();

        items.forEach(item => {
            if (!seenItems.has(item)) {
                const listItem = document.createElement('li');
                listItem.textContent = item;
                listElement.appendChild(listItem);
                seenItems.add(item);

                // Attachez les gestionnaires d'événements de click à chaque nouvel élément
                listItem.addEventListener('click', () => {
                    // Utilisez l'élément actuel comme ingrédient
                    const ingredient = item.toLowerCase();
                    createIngredientLabel(ingredient);
                    selectedIngredients.add(ingredient);
                    filterRecipesByIngredient();
                });
            }
        });

        // Fonction pour filtrer les recettes par ingrédient, ustensiles ou appareils
        function filterRecipesByIngredient() {
            const searchNoResults = document.querySelector('.search-no-results');
            const searchElement = document.querySelector('.search-element');
            console.log(Array.from(selectedIngredients).join(' '));
            // Filtrer les recettes qui contiennent l'ingrédient sélectionné
            const filteredRecipes = recipes.filter(recipe => {
                const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
                return (
                    recipeIngredients.some(ingredient => selectedIngredients.has(ingredient))
                    /*
                    recipe.name.toLowerCase().includes(Array.from(selectedIngredients).join(' '))
                    recipe.description.toLowerCase().includes(Array.from(selectedIngredients).join(' ')) ||
                    recipe.appliance.toLowerCase().includes(Array.from(selectedIngredients).join(' ')) ||
                    recipe.ustensils.some(ustensils => selectedIngredients.has(ustensils.toLowerCase()))
                    */
                );
            });
            galleryContainer.innerHTML = '';

            if (filteredRecipes.length === 0) {
                // Aucun résultat trouvé, afficher le message avec le terme de recherche
                searchElement.textContent = "ces élements de recherche";
                searchNoResults.style.display = 'block';
            } else {
                // Masquer le message s'il y a des résultats et Afficher les recettes filtrées
                searchNoResults.style.display = 'none';
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
                console.log(selectedIngredients);
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

/*************************************************************************************/

// Sélectionnez tous les éléments avec la class "pointer"
const pointerElements = document.querySelectorAll('.pointer');

// Fonction pour gérer le click sur un élément avec la class "pointer"
function handlePointerClick(event) {
    const pointer = event.currentTarget;
    const arrow = pointer.querySelector('.arrow');
    // Sélectionnez l'élément avec la class "arrow" à l'intérieur du pointer
    const displayList = pointer.nextElementSibling;

    displayList.classList.toggle('open');
    if (displayList.classList.contains("open")) {
        arrow.style.transform = "rotate(135deg)";
        arrow.style.bottom = "-3px";
    } else {
        arrow.style.transform = "rotate(-45deg)";
        arrow.style.bottom = "3px";
    }
}

// Ajoutez un écouteur d'événement de click à chaque élément "pointer"
pointerElements.forEach(pointer => {
    pointer.addEventListener('click', handlePointerClick);
});