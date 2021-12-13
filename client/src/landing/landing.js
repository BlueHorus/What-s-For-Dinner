import React from 'react';
import PanGraphic from './panGraphic.js'
import Recipe from '../shared/recipecard.js';
import axios from 'axios'

class Landing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            featuredRecipes: null,
        }
    }

    componentDidMount() {
        axios.get('/getFeaturedRecipes')
        .then((data) => {
            console.log(data);
            this.setState({
                featuredRecipes: data.data.results
            })
        })
    }

    render() {
        if (this.state.featuredRecipes === null) {
            return null;
        }
  return (
    <>
    <PanGraphic />
    <div>
        {this.state.featuredRecipes.map((recipe) => {
            return  <Recipe handleButtonPress={this.props.handleButtonPress} user={this.props.user} recipe={recipe}/>
        })}
    </div>
    </>
  )
    }
}

export default Landing;

var sample = {
  "results": [
         {
             "pricePerServing": 53.62,
             "id": 647572,
             "title": "How To Make Basic Marinara Sauce",
             "image": "https://spoonacular.com/recipeImages/647572-312x231.jpg",
             "nutrition": {
                 "nutrients": [
                     {
                         "name": "Calories",
                         "amount": 38.88, // kCal
                     },
                     {
                         "name": "Fat",
                         "amount": 0.33, //grams
                     },
                     {
                         "name": "Carbohydrates",
                         "amount": 8.58, //
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
                         "amount": 2.25,
                     },
                 ],
                 "caloricBreakdown": {
                     "percentProtein": 15.27,
                     "percentFat": 6.78,
                     "percentCarbs": 77.95
                 }
             },
             "summary": "How To Make Basic Marinara Sauce is a <b>caveman, gluten free, primal, and whole 30</b> sauce. This recipe makes 12 servings with <b>37 calories</b>, <b>2g of protein</b>, and <b>0g of fat</b> each. For <b>61 cents per serving</b>, this recipe <b>covers 7%</b> of your daily requirements of vitamins and minerals. Head to the store and pick up tomatoes, herbs, salt and pepper, and a few other things to make it today. 1 person has made this recipe and would make it again. From preparation to the plate, this recipe takes around <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 68%</b>. This score is solid. Try <a href=\"https://spoonacular.com/recipes/basic-marinara-sauce-634391\">Basic Marinara Sauce</a>, <a href=\"https://spoonacular.com/recipes/how-to-make-homemade-roasted-tomato-basil-marinara-sauce-no-sugar-added-915383\">How to Make Homemade Roasted Tomato Basil Marinara Sauce (no sugar added!)</a>, and <a href=\"https://spoonacular.com/recipes/basic-marinara-245233\">Basic Marinara</a> for similar recipes.",
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
             "missedIngredients": [
                 {
                     "name": "herbs"
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
         },
       ]
     }