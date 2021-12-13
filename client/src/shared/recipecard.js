
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
import FavoriteButton from './favoriteRecipeButton.js';
import UpVoteButton from './upVoteButton.js';
import DownVoteButton from './downVoteButton.js'
import { PieChart } from 'react-minimal-pie-chart';


function Recipe (props) {
    console.log(props.recipe)
    const recipe = props.recipe


  return (
    <div>
        <div className="recipecard">
            <div className="recipetitle">Recipe: {recipe.title}</div>
            <img className="recipeimage" src={recipe.image} alt="a picture of food"/>
            <div className="recipelink"><a href={recipe.spoonacularSourceUrl}>Full recipe</a></div>
            <div className="summary">Summary: {recipe.summary.replace(/<[^>]+>/g, '').slice(0,240)}...</div>
            {/* <div className="ingredients">Ingredients:
                {recipe.usedIngredients.map(ing => <li className="foundingredients">{ing.name}</li>)}
                {recipe.missedIngredients.map(ing => <li className="missingingredients">{ing.name}</li>)}
            </div> */}
            <div className="mealtags">Meal tags:{recipe.dishTypes.map(type => <li>{type}</li>)}</div>
            <div className ="diet">Diet friendly:{recipe.diets.map(type => <li>{type}</li>)}</div>
            <div className="opinionbutton">
                <FavoriteButton recipe={recipe} user={props.user} handleButtonPress={props.handleButtonPress}/>
                <UpVoteButton recipe={recipe} handleButtonPress={props.handleButtonPress}/>
                <DownVoteButton recipe={recipe} handleButtonPress={props.handleButtonPress}/>
            </div>
        </div>
        <div className="recipeadditions">
            <div>
                Nutrition: {recipe.nutrition.nutrients.map(info => <li>{info.name},{info.amount}</li>)}
            </div>
            <div>
                Calorie % by type: <PieChart
                                data={[
                                    { title: "Protein", value: recipe.nutrition.caloricBreakdown.percentProtein, color: '#E38627' },
                                    { title: "Fat", value: recipe.nutrition.caloricBreakdown.percentFat, color: '#C13C37' },
                                    { title: "Carbs", value: recipe.nutrition.caloricBreakdown.percentCarbs, color: '#6A2135' },
                                ]}
                                viewBoxSize={[120, 120]}
                                label={(data) => data.dataEntry.title}
                                labelPosition={65}
                                labelStyle={{
                                    fontSize: "10px",
                                    fontColor: "FFFFFA",
                                    fontWeight: "800",
                                }}
                                />
            </div>
        </div>
    </div>
  )
}


export default Recipe;
