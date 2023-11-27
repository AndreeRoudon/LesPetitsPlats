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