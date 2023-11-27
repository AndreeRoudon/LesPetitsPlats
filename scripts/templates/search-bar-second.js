function initSearchFeature() {
    const textInputs = document.querySelectorAll('.text-input');

    for (let i = 0; i < textInputs.length; i++) {
        textInputs[i].addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            if (searchTerm.length < 3) {
                resetList(this.parentElement.nextElementSibling);
                return;
            }

            const listToFilter = this.parentElement.nextElementSibling;
            filterList(listToFilter, searchTerm);
        });
    }
}

function filterList(list, searchTerm) {
    const items = list.querySelectorAll('li');
    for (let i = 0; i < items.length; i++) {
        if (items[i].textContent.toLowerCase().includes(searchTerm)) {
            items[i].style.display = '';
        } else {
            items[i].style.display = 'none';
        }
    }
}

function resetList(list) {
    const items = list.querySelectorAll('li');
    for (let i = 0; i < items.length; i++) {
        items[i].style.display = '';
    }
}

initSearchFeature();