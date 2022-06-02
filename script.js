/** 1- Preparer les selecteurs ( id=" ) */

/* 
Nommage + technique
Tout ce qui lance une action ou serra modifiable dynamiquement (ashynrhone)
*/

/*
const searchInputEl = document.getElementById("search-input");
const searchBtnEl = document.getElementById("search-btn");
const mealEl = document.getElementById("meal");
const recipeCloseBtnEl = document.getElementById("recipe-close-btn");
*/

// document.querySelector();

// nommage +  explicite
const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector("meal-details-content"); // lg 102
const recipeCloseBtn = document.getElementById("recipe-close-btn");

/** 2- Action à realiser sur ces elements  */
//[ok] Test.
//console.log(searchBtn);

// [X] a) ajouter une action au click sur le button sufmit | onclick
searchBtn.addEventListener("click", getMealList);

/**
 * ASYNCHRONE FUNCTION API
 * get meal list that matches with the ingredients - https://www.themealdb.com/api.php
 */
function getMealList(i = 6) {
  // let  .value .trim
  let searchInputTxt = document.getElementById("search-input").value.trim();
  console.log(searchInputTxt);

  //on fetch  l'url on recupere du json
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
  )
    /**
     * The json() method of the Response interface takes a Response stream
     * and reads it to completion. It returns a promise which resolves with
     * the result of parsing the body text as JSON.
     */

    /**
     * element.classList
     * La propriété en lecture seule Element.classList retourne une collection directe DOMTokenList des attributs de classe de l'élément.
     * L'utilisation de classList est une alternative à la propriété element.className qui renvoie une chaine
     * composée de la liste des classes, séparées par des espaces.
     * add()  remove()
     * https://developer.mozilla.org/fr/docs/Web/API/Element/classList
     */

    .then((response) => response.json())
    .then((data) => {
      console.log(data.meals);
      //declaration de html (string)
      let html = "";
      let maximumIteration = Math.round(data.meals.length / 6);

      console.log(maximumIteration);
      //Amelioration button load more recuperer les cards
      if (data.meals) {
        let start = 0,
          end = 6; // ++6 xmax-1

        for (let i = 0; i < maximumIteration; i++) {
          //... start
          html += `<div class = "load-more-${i}">`;
          //Recuperer des slides de 6
          data.meals.slice(start, end).forEach((meal) => {
            // ou alors faire decoupage de 6 dans des div
            html += `
                        <div class = "meal-item" data-id = "${meal.idMeal}">
                            <div class = "meal-img">
                                <img src = "${meal.strMealThumb}" alt = "food">
                            </div>
                            <div class = "meal-name">
                                <h3>${meal.strMeal}</h3>
                                <a href = "#" class = "recipe-btn">Get Recipe</a>
                            </div>
                        </div>
                    `;
          });

          html += `</div>`;
          //... end

          //incrementation en fin de script.
          start += 6;
          end += 6;
        }

        //Load More
        // if (i < maximumIteration) {
        //   i += 6;
        //   console.log(i);
        //   html += `<div>
        //               <button class="loadMore" onclick="loadMore(${i})">Load More</button>
        //           </div>`;
        // }

        mealList.classList.remove("notFound");
        //button load more | incrementation posible eb:41/6 arrondi inferieur
        // possibilite de 6 incrementations.  (i= ++6) 12|18|24|30|36|42|
      } else {
        html = `
                <div class="carrefour"><p>Désolé acune recettes n'a ete touvé'!
                <br> <b>Faites vos courses.</b</p>
                <a href="https://www.carrefour.fr/services/livraison-domicile"><img src="/images/logoCarrefour.jpg" alt="carrefour" width="500" /></a>
                <br>
                <a href="/">Retour</a>
                </div>
        `;
        mealList.classList.add("notFound");
      }
      //Injection du html (6,12,18,...)
      mealList.innerHTML = html;
      // Ajoute un bouton load more en fin de list (mealLoadMore button load more
    });
}
