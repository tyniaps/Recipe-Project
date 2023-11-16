
document.getElementById("button").addEventListener('click',()=>{
    let inputValue = document.getElementById('inputName').value 
    let details = document.getElementById("details")
    details.innerHTML = ""
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
        .then(response => response.json())
        .then(data=> {
            const items = document.getElementById("items")
            items.innerHTML = ""
            if(data.meals == null){
                document.getElementById("msg").style.display = "block"
            }else{
                document.getElementById("msg").style.display = "none"
                data.meals.forEach(meal =>{
                    itemDiv = document.createElement("div")
                    itemDiv.className = "m-2 singleItem"
                    itemDiv.setAttribute('onclick' , `details('${meal.idMeal}')`)
                    let  itemInfo = `
                    <div class="card " style="width: 12rem;">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body text-center">
                            <h5 class="card-text">${meal.strMeal}</h5>
                        </div>
                    </div>
                    `
                    itemDiv.innerHTML = itemInfo
                    items.appendChild(itemDiv)
                })
            }

        })
})

function details(id){
    fetch(`https:www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res=>res.json())
    .then(detail => {
        let meal = detail.meals[0]
        console.log(meal)
        let details = document.getElementById("details")
        details.innerHTML = ""
        let detailsDiv = document.createElement("div")
        let detailsInfo = `
        <div class="card " style="width: 19rem;">
            <img src="${meal.strMealThumb}" class="card-img-top" class= "food-images">
            <div class="card-body ">
                <h3 class="card-text">${meal.strMeal}</h3>
                <h6>Ingredients</h6>
                <ul>
                    <li>${meal.strArea}</li>
                    <li>${meal.strCategory}</li>
                    <li>${meal.strIngredient1}</li>
                    <li>${meal.strIngredient2}</li>
                    <li>${meal.strIngredient3}</li>
                    <li>${meal.strIngredient4}</li>
                    <li>${meal.strIngredient5}</li>
                </ul>
            </div>
        </div>
        `
        detailsDiv.innerHTML = detailsInfo
        details.appendChild(detailsDiv)
    })
}





//I created this function to getElementById and fetch the data from the API

document.getElementById("generateButton").addEventListener("click", function () {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("NETWORK RESPONSE NOT OK");
        }
      })
      .then(function (data) {
        console.log(data);
        displayCocktail(data);
      })
      .catch((error) => {
        console.error("FETCH ERROR:", error);
      });
  });

    //This section will display the data on the page 
  
    function displayCocktail(data) {
        const cocktail = data.drinks[0];
        const cocktailDiv = document.getElementById("cocktail");
      
        //This section will clear previous content from the page 
        cocktailDiv.innerHTML = "";
      
        const cocktailName = cocktail.strDrink;
        const heading = document.createElement("h1");
        heading.innerHTML = cocktailName;
        cocktailDiv.appendChild(heading);
      
        const cocktailImg = document.createElement("img");
        cocktailImg.src = cocktail.strDrinkThumb;
        cocktailDiv.appendChild(cocktailImg);
        document.body.style.backgroundImage = "url('" + cocktail.strDrinkThumb + "')";
      
        const cocktailIngredients = document.createElement("ul");
        cocktailDiv.appendChild(cocktailIngredients);
      
        // This section will loop through ingredients and measurements
        for (let i = 1; i <= 15; i++) {
          const ingredient = cocktail[`strIngredient${i}`];
          const measurement = cocktail[`strMeasure${i}`];
      
          if (ingredient) {
            const listItem = document.createElement("li");
            listItem.innerHTML = measurement ? `${measurement} ${ingredient}` : ingredient;
            cocktailIngredients.appendChild(listItem);
          } else {
            break; // This will exit the loop if no more ingredients
          }
        }
      }
