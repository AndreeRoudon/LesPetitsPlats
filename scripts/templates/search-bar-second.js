function initSearchFeature() {
    const textInputs = document.querySelectorAll('.text-input');

    textInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            if (searchTerm.length < 3) {
                resetList(this.parentElement.nextElementSibling);
                return;
            }

            const listToFilter = this.parentElement.nextElementSibling;
            filterList(listToFilter, searchTerm);
        });
    });
}

function filterList(list, searchTerm) {
    const items = list.querySelectorAll('li');
    items.forEach(item => {
        if (item.textContent.toLowerCase().includes(searchTerm)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

function resetList(list) {
    const items = list.querySelectorAll('li');
    items.forEach(item => item.style.display = '');
}

initSearchFeature();