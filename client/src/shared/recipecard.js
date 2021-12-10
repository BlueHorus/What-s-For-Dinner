
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
import { PieChart } from 'react-minimal-pie-chart';


function Recipe (props) {

    const recipe = props.recipe.results[0]
    console.log(recipe)

  return (
    <div>
        <div className="recipecard">
            <div className="recipetitle">Recipe: {recipe.title}</div>
            <div className="recipeimage"><img src={recipe.image} alt="a picture of food"/> </div>
            <div className="recipelink"><a href={recipe.spoonacularSourceUrl}>Full recipe</a></div>
            <div className="summary">Summary: {recipe.summary.replace(/<[^>]+>/g, '').slice(0,240)}...</div>
            <div className="ingredients">Ingredients:
                {recipe.usedIngredients.map(ing => <li className="foundingredients">{ing.name}</li>)}
                {recipe.missedIngredients.map(ing => <li className="missingingredients">{ing.name}</li>)}
            </div>
            <div className="mealtags">Meal tags:{recipe.dishTypes.map(type => <li>{type}</li>)}</div>
            <div>Diet friendly:{recipe.diets.map(type => <li>{type}</li>)}</div>
            <div className="opinionbutton">
                <div className="favoritebutton">button </div>
                <div className="likebutton">button </div>
                <div className="dislikebutton">button </div>
            </div>
        </div>
        <div className="recipeadditions">
            <div>
                Nutrition: {recipe.nutrition.nutrients.map(info => <li>{info.name},{info.amount}</li>)}
            </div>
            <div>
                Calories: <PieChart
                                data={[
                                    { title: "Protein", value: recipe.nutrition.caloricBreakdown.percentProtein, color: '#E38627' },
                                    { title: "Fat", value: recipe.nutrition.caloricBreakdown.percentFat, color: '#C13C37' },
                                    { title: "Carbs", value: recipe.nutrition.caloricBreakdown.percentCarbs, color: '#6A2135' },
                                ]} viewBoxSize={[120, 120]}
                                />
            </div>
        </div>
    </div>
  )
}


export default Recipe;
