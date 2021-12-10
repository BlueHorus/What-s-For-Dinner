
/**
 * "As a user, i want to see featured recipes:
1. I want to see maximum three recipes
2. i want to see the featured recipe as the most upvoted recipe"

Title
Hyperlink to recipe
Thumbnail
Show ingredients that you have in your ‘pantry’ in green
Maybe eventually show ingredients you don’t have in red?
Tags (breakfast, lunch, dinner, etc.)

Recipe

 */

import React from 'react';
import axios from 'axios';
import FavoriteButton from './favoriteRecipeButton.js'
import { PieChart } from 'react-minimal-pie-chart';


function Recipe (props) {
  // let categories = [];
//   console.log((props.recipe))
//   console.log(props.recipe.dishTypes)
  // for (var i = 0; i < props.recipe.results.dishTypes; i++) {
  //   categories.push(props.recipe.results.dishTypes[i])
  // }
  // axios.get('/featuredorsomething', (req, res) => {
  //   console.log(req)
  // })
  return (
    <div>
        <div className="recipecard">
            <h3 className="recipetitle">Recipe: {props.recipe.results[0].title}</h3>
            <div className="recipeimage"><img src={props.recipe.results[0].image}/> </div>
            <div className="recipelink"><a href={props.recipe.spoonacularSourceUrl}>Full recipe</a></div>
            <div className="summary">Summary: {props.recipe.summary.replace(/<[^>]+>/g, '').slice(0,240)}...</div>
            <div className="ingredients">Ingredients:
                {props.recipe.usedIngredients.map(ing => <li className="foundingredients">{ing.name}</li>)}
                {props.recipe.unusedIngredients.map(ing => <li className="missingingredients">{ing.name}</li>)}
            </div>
            <div className="mealtags">Meal tags:{props.recipe.dishTypes.map(type => <li>{type}</li>)}</div>
            <div>Diet friendly:{props.recipe.diets.map(type => <li>{type}</li>)}</div>
            <div className="opinionbutton">
            <FavoriteButton />
                <div className="likebutton">PH</div>
                <div className="dislikebutton">PH</div>
            </div>
        </div>
        <div className="recipeadditions">
            <div>
                Nutrition: {props.recipe.results[0].nutrition.nutrients.map(info => <li>{info.name},{info.amount}</li>)}
            </div>
            <div>
                Calories: <PieChart
                                data={[
                                    { title: "Protein", value: props.recipe.results[0].caloricBreakdown.percentProtein, color: '#E38627' },
                                    { title: "Fat", value: props.recipe.results[0].caloricBreakdown.percentFat, color: '#C13C37' },
                                    { title: "Carbs", value: props.recipe.results[0].caloricBreakdown.percentCarbs, color: '#6A2135' },
                                ]} viewBoxSize={[120, 120]}
                                />
            </div>
        </div>
    </div>
  )
}


export default Recipe


var sample = {
  "results": [
      {
          "id": 647572,
          "title": "How To Make Basic Marinara Sauce",
          "image": "https://spoonacular.com/recipeImages/647572-312x231.jpg",
          "imageType": "jpg",
          "nutrition": {
              "nutrients": [
                  {
                      "name": "Calories",
                      "amount": 38.88,
                  },
                  {
                      "name": "Fat",
                      "amount": 0.33,
                  },
                  {
                      "name": "Carbohydrates",
                      "amount": 8.58,
                  },
                  {
                      "name": "Sugar",
                      "amount": 4.99,
                  },
                  {
                      "name": "Cholesterol",
                      "amount": 0.0,
                  },
                  {
                      "name": "Sodium",
                      "amount": 202.48,
                  },
                  {
                      "name": "Protein",
                      "amount": 1.68,
                  },
                  {
                      "name": "Fiber",
                      "title": "Fiber",
                      "amount": 2.25,
                      "unit": "g",
                      "percentOfDailyNeeds": 8.99
                  }
              ]
                  },

              "caloricBreakdown": {
                  "percentProtein": 15.27,
                  "percentFat": 6.78,
                  "percentCarbs": 77.95
              },
          },
          ],
          "summary": "How To Make Basic Marinara Sauce is a <b>caveman, gluten free, primal, and whole 30</b> sauce. This recipe makes 12 servings with <b>37 calories</b>, <b>2g of protein</b>, and <b>0g of fat</b> each. For <b>61 cents per serving</b>, recipe <b>covers 7%</b> of your daily requirements of vitamins and minerals. Head to the store and pick up tomatoes, herbs, salt and pepper, and a few other things to make it today. 1 person has made recipe and would make it again. From preparation to the plate, recipe takes around <b>45 minutes</b>. All things considered, we decided recipe <b>deserves a spoonacular score of 68%</b>. This score is solid. Try <a href=\"https://spoonacular.com/recipes/basic-marinara-sauce-634391\">Basic Marinara Sauce</a>, <a href=\"https://spoonacular.com/recipes/how-to-make-homemade-roasted-tomato-basil-marinara-sauce-no-sugar-added-915383\">How to Make Homemade Roasted Tomato Basil Marinara Sauce (no sugar added!)</a>, and <a href=\"https://spoonacular.com/recipes/basic-marinara-245233\">Basic Marinara</a> for similar recipes.",
          "cuisines": [],
          "dishTypes": [
              "sauce"
          ],
          "diets": [
              "gluten free",
              "dairy free",
              "paleolithic",
              "lacto ovo vegetarian",
              "primal",
              "vegan"
          ],
          "occasions": [],
          "spoonacularSourceUrl": "https://spoonacular.com/how-to-make-basic-marinara-sauce-647572",
          "usedIngredientCount": 2,
          "missedIngredientCount": 2,
          "likes": 0,
          "missedIngredients": [
              {
                  "name": "herbs",
              },
              {
                  "name": "yellow onions",
              }
          ],
          "usedIngredients": [
              {
                  "name": "garlic",
              },
              {
                  "name": "tomatoes",
              }
          ],
          "unusedIngredients": []
}
