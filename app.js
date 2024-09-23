
const searchbox = document.querySelector(".searchbox");
const srcbtn = document.querySelector(".srcbtn");
const recipe = document.querySelector(".recipe-container");
const recipeClosebtn = document.querySelector(".recipe-close-btn");
const recipeDetailContent = document.querySelector(".recipe-detail-content");


// function to get recipe

const fetchrecipe = async (query) => {
    recipe.innerHTML = "<h2> Featching recipe...   </h2>"
    try {
        

    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const response = await data.json();
    // console.log(response.meals[0]);


    recipe.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea} </span>Dish</p>
        <p>Belongs to <span> ${meal.strCategory} </span>Category</p>
        `
        const button = document.createElement("button");
        button.textContent = "view recipe";
        recipeDiv.appendChild(button);

        button.addEventListener("click", () => {
            openRecipePopup(meal);
        })

        recipe.appendChild(recipeDiv);
    });
    } catch (error) {
        recipe.innerHTML = "<h2>No such type of recipe...</h2>"
}
}


// recipe-Detail-Content function

const fetchIngredients = (meal) => {
    let IngredientList = "";
    console.log(meal)

    for (let i = 1; i <= 20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            IngredientList += `<li>${measure} ${ingredient} </li>`
        } else {
            break;
        }
    }
    return IngredientList;
}

const openRecipePopup = (meal) => {
    recipeDetailContent.innerHTML = `
     <h2 class="recipeName">${meal.strMeal}</h2>
     <h3  >Ingredents:</h3>
     <ul class="IngredientList" >${fetchIngredients(meal)} </ul>

     <div class="recipeInstructions">
      <h3>Instructions:</h3>
      <p>${meal.strInstructions} </p>
    </div>
   
    `
    
    recipeDetailContent.parentElement.style.display = "block";

}

recipeClosebtn.addEventListener("click", () => {
    recipeDetailContent.parentElement.style.display = "none";
})

srcbtn.addEventListener("click", (e) => {
    e.preventDefault();
    const searchInput = searchbox.value.trim()
    if (!searchInput) {
        recipe.innerHTML=`<h2>Type the meal in the search box </h2>`
        return;
    }
    fetchrecipe(searchInput);
    
})