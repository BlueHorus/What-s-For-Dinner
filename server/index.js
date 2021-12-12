const express = require("express");
const path = require("path");
const axios = require("axios");
const e = require("express");
const app = express();
const Recipes = require("./db/models/recipes.js");
const Users = require("./db/models/users.js");

const port = 3000;

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

var parseResponse = function (response) {
  // parse response down to example object in team folder
  // return parsed response
  console.log("Made it to parse Response");
  console.log(response);

  var parsedResponse = {
    results: [],
  };

  for (var i = 0; i < response.results.length; i++) {
    var recipe = response.results[i];
    var parsedRecipe = {
      pricePerServing: recipe.pricePerServing,
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      nutrition: {
        nutrients: [
          {
            name: recipe.nutrition.nutrients[0].name,
            amount: recipe.nutrition.nutrients[0].amount,
          },
          {
            name: recipe.nutrition.nutrients[1].name,
            amount: recipe.nutrition.nutrients[1].amount,
          },
          {
            name: recipe.nutrition.nutrients[3].name,
            amount: recipe.nutrition.nutrients[3].amount,
          },
          {
            name: recipe.nutrition.nutrients[5].name,
            amount: recipe.nutrition.nutrients[5].amount,
          },
          {
            name: recipe.nutrition.nutrients[6].name,
            amount: recipe.nutrition.nutrients[6].amount,
          },
          {
            name: recipe.nutrition.nutrients[7].name,
            amount: recipe.nutrition.nutrients[7].amount,
          },
          {
            name: recipe.nutrition.nutrients[8].name,
            amount: recipe.nutrition.nutrients[8].amount,
          },
          {
            name: recipe.nutrition.nutrients[14].name,
            amount: recipe.nutrition.nutrients[14].amount,
          },
        ],
        caloricBreakdown: {
          percentProtein: recipe.nutrition.caloricBreakdown.percentProtein,
          percentFat: recipe.nutrition.caloricBreakdown.percentFat,
          percentCarbs: recipe.nutrition.caloricBreakdown.percentCarbs,
        },
      },
      summary: recipe.summary,
      cuisines: recipe.cuisines,
      dishTypes: recipe.dishTypes,
      diets: recipe.diets,
      occasions: recipe.occasions,
      spoonacularSourceUrl: recipe.spoonacularSourceUrl,
      usedIngredientCount: recipe.usedIngredientCount,
      missedIngredientCount: recipe.missedIngredientCount,
      missedIngredients: recipe.missedIngredients,
      usedIngredients: recipe.usedIngredients,
      unusedIngredients: recipe.unusedIngredients,
    };

    parsedResponse.results.push(parsedRecipe);
  }
  return parsedResponse;
};

var getRecipesbyId = function (recipeIds) {
  // get user's favorites from db
  // hit spoonacular api
  // parse each recipe object with parseResponse function
  // return parsed response
  // api url: https://api.spoonacular.com/recipes/informationBulk$ids=(comma separated list of recipe ids)
};

app.get("/getRecipesFromIngredients", (req, res) => {
  // request should include diet, dietary restrictions, and ingredients
  // send request to spoonacular
  // parse response into example object
  // send example object back to the front-end
  // api url: https://api.spoonacular.com/recipes/complexSearch?fillIngredients=true&sort=max-used-ingredients&addRecipeNutrition=true&apiKey=5eb864cd4c9b47b282c6ec757f5dd0b7&sortDirection=desc&includeIngredients=garlic,tomato&diet=vegan
  if (req.body.ingredients === undefined) {
    var ingredientsParam = null;
  } else {
    var ingredients = req.body.ingredients;
    var ingredientsParam = `&includeIngredients=${ingredients}`;
  }

  if (req.body.intolerances === undefined) {
    var intolerancesParam = null;
  } else {
    var intolerances = req.body.intolerances;
    var intolerancesParam = `&intolerances=${intolerances}`;
  }

  if (req.body.diet === undefined) {
    var dietParam = null;
  } else {
    var diet = req.body.diet;
    var dietParam = `&diet=${diet}`;
  }

  if (
    ingredientsParam === null &&
    intolerancesParam === null &&
    dietParam === null
  ) {
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?fillIngredients=true&sort=max-used-ingredients&addRecipeNutrition=true&apiKey=5eb864cd4c9b47b282c6ec757f5dd0b7&sortDirection=desc`
      )
      .then(({ data }) => {
        var parsedData = parseResponse(data);
        res.send(parsedData);
      })
      .catch((error) => {
        console.log("There was an error", error);
      });
  } else if (
    ingredientsParam !== null &&
    intolerancesParam === null &&
    dietParam === null
  ) {
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?fillIngredients=true&sort=max-used-ingredients&addRecipeNutrition=true&apiKey=5eb864cd4c9b47b282c6ec757f5dd0b7&sortDirection=desc${ingredientsParam}`
      )
      .then(({ data }) => {
        var parsedData = parseResponse(data);
        res.send(parsedData);
      })
      .catch((error) => {
        console.log("There was an error", error);
      });
  } else if (
    ingredientsParam === null &&
    intolerancesParam !== null &&
    dietParam === null
  ) {
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?fillIngredients=true&sort=max-used-ingredients&addRecipeNutrition=true&apiKey=5eb864cd4c9b47b282c6ec757f5dd0b7&sortDirection=desc${intolerancesParam}`
      )
      .then(({ data }) => {
        var parsedData = parseResponse(data);
        res.send(parsedData);
      })
      .catch((error) => {
        console.log("There was an error", error);
      });
  } else if (
    ingredientsParam === null &&
    intolerancesParam === null &&
    dietParam !== null
  ) {
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?fillIngredients=true&sort=max-used-ingredients&addRecipeNutrition=true&apiKey=5eb864cd4c9b47b282c6ec757f5dd0b7&sortDirection=desc${dietParam}`
      )
      .then(({ data }) => {
        var parsedData = parseResponse(data);
        res.send(parsedData);
      })
      .catch((error) => {
        console.log("There was an error", error);
      });
  } else if (
    ingredientsParam !== null &&
    intolerancesParam !== null &&
    dietParam === null
  ) {
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?fillIngredients=true&sort=max-used-ingredients&addRecipeNutrition=true&apiKey=5eb864cd4c9b47b282c6ec757f5dd0b7&sortDirection=desc${ingredientsParam}${intolerancesParam}`
      )
      .then(({ data }) => {
        var parsedData = parseResponse(data);
        res.send(parsedData);
      })
      .catch((error) => {
        console.log("There was an error", error);
      });
  } else if (
    ingredientsParam !== null &&
    intolerancesParam === null &&
    dietParam !== null
  ) {
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?fillIngredients=true&sort=max-used-ingredients&addRecipeNutrition=true&apiKey=5eb864cd4c9b47b282c6ec757f5dd0b7&sortDirection=desc${ingredientsParam}${dietParam}`
      )
      .then(({ data }) => {
        var parsedData = parseResponse(data);
        res.send(parsedData);
      })
      .catch((error) => {
        console.log("There was an error", error);
      });
  } else if (
    ingredientsParam === null &&
    intolerancesParam !== null &&
    dietParam !== null
  ) {
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?fillIngredients=true&sort=max-used-ingredients&addRecipeNutrition=true&apiKey=5eb864cd4c9b47b282c6ec757f5dd0b7&sortDirection=desc${intolerancesParam}${dietParam}`
      )
      .then(({ data }) => {
        var parsedData = parseResponse(data);
        res.send(parsedData);
      })
      .catch((error) => {
        console.log("There was an error", error);
      });
  } else if (
    ingredientsParam !== null &&
    intolerancesParam !== null &&
    dietParam !== null
  ) {
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?fillIngredients=true&sort=max-used-ingredients&addRecipeNutrition=true&apiKey=5eb864cd4c9b47b282c6ec757f5dd0b7&sortDirection=desc${ingredientsParam}${intolerancesParam}${dietParam}`
      )
      .then(({ data }) => {
        var parsedData = parseResponse(data);
        res.send(parsedData);
      })
      .catch((error) => {
        console.log("There was an error", error);
      });
  }
  //req.body.ingredients
  //var intolerances = req.body.intolerances;
  //var diet = req.body.diet;
  //res.send("getRecipesFromIngredients");
});

app.get("/getFeaturedRecipes", (req, res) => {
  // queries database for most upvoted recipes
  // send ids to spoonacular
  // send back most upvoted recipes
  res.send("getFeaturedRecipes");
});

app.post("/createUser", (req, res) => {
  // request should include UID, profile picture url, and username
  // query database to create a new user
  // send "successfully created new user"
  var userId = req.body.uid;
  var profilePicUrl = req.body.profilePic;
  var username = req.body.username;
  res.send("Successfully created user!");
});

app.get("/authenticate", (req, res) => {
  // request should include UID from firebase and token
  // query database to create a new user
  // send "successfully created new user"
  var userId = req.body.uid;
  var token = req.body.token;
  res.send("Successfully authenticated user!");
});

app.get("/getUserInfo", (req, res) => {
  // request should include uid
  // queries database for user object
  // send user object back to front-end
  var userId = req.body.uid;
  res.send("getUserInfo");
});

app.put("/updateIngredients", (req, res) => {
  // request should contain ingredients
  // query database to update ingredients
  // send "successfully updated ingredients"
  var userId = req.body.uid;
  var ingredients = req.body.ingredients;
  res.send("Successfully updated ingredients!", ingredients);
});

app.put("/updateDiet", (req, res) => {
  // request should include a single diet from supported diet list
  // query to databse to update diet
  // send "successfully updated diet"
  var userId = req.body.uid;
  var diet = req.body.diet;
  res.send("Successfully updated diet!", diet);
});

app.put("/updateIntolerances", (req, res) => {
  // request should include intolerances from supported intolerance list
  // query database to update intolerances
  // send "successfully updated intolerances"
  var userId = req.body.uid;
  var intolerances = req.body.intolerances;
  res.send("Successfully updated intolerances!", intolerances);
});

app.put("/updateFavorites", (req, res) => {
  // request should include user id and recipeId
  // query database to update note
  var userId = req.body.uid;
  var recipeId = req.body.recipeId;
  res.send("Successfully updates favorites!", recipeId);
});

app.put("/updateUsername", (req, res) => {
  // request should include uid and new username
  // query database to update note
  var userId = req.body.uid;
  var newUsername = req.body.newUsername;
  res.send("Successfully updated username!", newUsername);
});

app.put("/updateProfilePic", (req, res) => {
  // request should include uid and new profile pic url
  // query database to update note
  var userId = req.body.uid;
  var newProfilePicUrl = req.body.newProfilePic;
  res.send("Successfully updated profile pic!", newProfilePic);
});

app.put("/updateNote", (req, res) => {
  // request should include user id and note
  // query database to update note
  var userId = req.body.uid;
  var newNote = req.body.note;
  res.send("Successfully updated note!", newNote);
});

app.put("/updateUpvote", (req, res) => {
  // request should include recipe id
  // query database to update upvote
  var recipeId = req.body.recipeId;
  res.send("Successfully updated upvote count!");
});

app.put("/updateDownvote", (req, res) => {
  // request should include recipe id
  // query database to update downvote
  console.log(req.body);
  var recipeId = req.body.recipeId;
  res.send("Successfully updated downvote count!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
