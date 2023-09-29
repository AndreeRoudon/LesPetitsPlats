async function getRecipes() {
    const response = await fetch('./data/recipes.json');
    const data = await response.json();
    let recipe = data.recipes;

    displayRecipes(recipe);
    searchBarPrincipal(recipe);
    searchBarSecond(recipe);
}

getRecipes();