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