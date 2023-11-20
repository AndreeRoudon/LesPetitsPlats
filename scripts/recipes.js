async function getRecipes() {
    const response = await fetch('./data/recipes.json');
    const data = await response.json();
    return data.recipes;
}

async function init(){
    const recipes = await getRecipes();

    displayRecipes(recipes);
    searchAlgo(recipes);
}

init();