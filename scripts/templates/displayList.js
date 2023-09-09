function createListItems(items, listElement) {
    const seenItems = new Set();

    items.forEach(item => {
        if (!seenItems.has(item)) {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            listElement.appendChild(listItem);
            seenItems.add(item);
        }
    });
}

// Fonction pour gérer le clic sur un élément avec la classe "pointer"
function handlePointerClick(event) {
    const pointer = event.currentTarget;
    const arrow = pointer.querySelector('.arrow'); 
    // Sélectionnez l'élément avec la classe "arrow" à l'intérieur du pointer
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

// Sélectionnez tous les éléments avec la classe "pointer"
const pointerElements = document.querySelectorAll('.pointer');

// Ajoutez un écouteur d'événement de clic à chaque élément "pointer"
pointerElements.forEach(pointer => {
    pointer.addEventListener('click', handlePointerClick);
});