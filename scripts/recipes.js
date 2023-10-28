let currentRecipes = getRecipes();

async function getRecipes() {
    const response = await fetch('./data/recipes.json');
    const data = await response.json();
    let recipes = data.recipes;

    return recipes;
}

async function init(){
    const recipes = await getRecipes();

    displayRecipes(recipes);
    searchBarPrincipal(recipes);
    searchBarSecond(recipes);
}

init();