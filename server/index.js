const express = require("express");
const path = require("path");
const axios = require("axios");
const e = require("express");
const app = express();
const Recipes = require("./db/models/recipes.js");
const Users = require("./db/models/users.js");
const admin = require("./foldername/admin.js");
const { Aggregate } = require("mongoose");
const port = 3000;

//10b44c84b9192c1452635abd85a02bcf02482b02 key 4
//5eb864cd4c9b47b282c6ec757f5dd0b7 key 3
//3a15e063e87b46579969ef7bb2d841e3 key 2
//5eb864cd4c9b47b282c6ec757f5dd0b7 key 1
var unless = function (middleware, ...paths) {
  return function (req, res, next) {
    const pathCheck = paths.some((path) => path === req.path);
    pathCheck ? next() : middleware(req, res, next);
  };
};

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(
  unless(
    admin.verifyToken,
    "/updateUpvote",
    "/updateDownvote",
    "/getFeaturedRecipes",
    "/getRecipesFromIngredients",
    "/favicon.ico"
  )
);

var parseResponse = function (response) {
  // parse response down to example object in team folder
  // return parsed response

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

app.get("/getRecipesFromIngredients", (req, res) => {
  // request should include diet, dietary restrictions, and ingredients
  // send request to spoonacular
  // parse response into example object
  // send example object back to the front-end
  // api url: https://api.spoonacular.com/recipes/complexSearch?fillIngredients=true&sort=max-used-ingredients&addRecipeNutrition=true&apiKey=5eb864cd4c9b47b282c6ec757f5dd0b7&sortDirection=desc&includeIngredients=garlic,tomato&diet=vegan
  if (req.query.ingredients === undefined) {
    var ingredientsParam = null;
  } else {
    var ingredients = req.query.ingredients;
    var ingredientsParam = `&includeIngredients=${ingredients}`;
  }

  if (req.query.intolerances === undefined) {
    var intolerancesParam = null;
  } else {
    var intolerances = req.query.intolerances;
    var intolerancesParam = `&intolerances=${intolerances}`;
  }

  if (req.query.diet === undefined) {
    var dietParam = null;
  } else {
    var diet = req.query.diet;
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
        res.status(200).send(parsedData);
      })
      .catch((error) => {
        res.status(500).send(error);
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
        res.status(200).send(parsedData);
      })
      .catch((error) => {
        res.status(500).send(error);
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
        res.status(200).send(parsedData);
      })
      .catch((error) => {
        res.status(500).send(error);
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
        res.status(200).send(parsedData);
      })
      .catch((error) => {
        res.status(500).send(error);
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
        res.status(200).send(parsedData);
      })
      .catch((error) => {
        res.status(500).send(error);
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
        res.status(200).send(parsedData);
      })
      .catch((error) => {
        res.status(500).send(error);
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
        res.status(200).send(parsedData);
      })
      .catch((error) => {
        res.status(500).send(error);
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
        res.status(200).send(parsedData);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }
});

app.get("/authenticate", (req, res) => {
  if (req.body.uid) {
    res.status(200).send("successfully authenticated");
  } else {
    res.status(500).send(false);
  }
});

app.get("/getUsersFavorites", (req, res) => {
  // request body should include uid
  var userId = req.body.uid;
  Users.getUserById(userId).then((response) => {
    if (response.favoriteRecipes === null) {
      res.status(400).send("User doesn't have any favorites");
    } else if (response.favoriteRecipes.length === 1) {
      var recipeIdString = response.favoriteRecipes.toString();
      axios
        .get(
          `https://api.spoonacular.com/recipes/${recipeIdString}/information?&includeNutrition=true&apiKey=5eb864cd4c9b47b282c6ec757f5dd0b7`
        )
        .then(({ data }) => {
          var array = [];
          array.push(data);
          var object = {
            results: array,
          };
          var parsedData = parseResponse(object);

          res.status(200).send(parsedData);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    } else {
      var recipeIdString = response.favoriteRecipes.toString();
      var queryString = `&ids=${recipeIdString},`;
      axios
        .get(
          `https://api.spoonacular.com/recipes/informationBulk?&includeNutrition=true&apiKey=5eb864cd4c9b47b282c6ec757f5dd0b7${queryString}`
        )
        .then(({ data }) => {
          var object = {
            results: data,
          };
          var parsedData = parseResponse(object);
          res.status(200).send(parsedData);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    }
  });
});

app.get("/getFeaturedRecipes", (req, res) => {
  // queries database for most upvoted recipes
  // send ids to spoonacular
  // send back most upvoted recipes
  Recipes.getTopVotedRecipes().then((result) => {
    var array = result.map((recipe) => {
      return recipe.id;
    });
    if (array.length === 1) {
      var recipeIdString = array.toString();
      axios
        .get(
          `https://api.spoonacular.com/recipes/${recipeIdString}/information?&includeNutrition=true&apiKey=5eb864cd4c9b47b282c6ec757f5dd0b7&sortDirection=desc`
        )
        .then(({ data }) => {
          var array = [];
          array.push(data);
          var object = {
            results: array,
          };
          var parsedData = parseResponse(object);

          res.status(200).send(parsedData);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    } else {
      var recipeIdString = array.toString();
      var queryString = `&ids=${recipeIdString}`;
      axios
        .get(
          `https://api.spoonacular.com/recipes/informationBulk?includeNutrition=true&apiKey=5eb864cd4c9b47b282c6ec757f5dd0b7&sortDirection=desc${queryString}`
        )
        .then(({ data }) => {
          var object = {
            results: data,
          };
          var parsedData = parseResponse(object);
          res.status(200).send(parsedData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send(err);
        });
    }
  });
});

app.post("/createUser", (req, res) => {
  // request should include UID, profile picture url, and username
  // query database to create a new user
  // send "successfully created new user"
  var userId = req.body.uid;
  var profilePicUrl = req.body.profilePic;
  var username = req.body.username;
  Users.createUser(userId, username, profilePicUrl)
    .then((response) => {
      res.status(201).send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/getUserInfo", (req, res) => {
  // request should include uid
  // queries database for user object
  // send user object back to front-end
  var userId = req.body.uid;
  Users.getUserById(userId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put("/updateIngredients", (req, res) => {
  // request should contain ingredients
  // query database to update ingredients
  // send "successfully updated ingredients"
  var userId = req.body.uid;
  var ingredients = req.body.ingredients;
  Users.updateIngredients(userId, ingredients)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put("/updateDiet", (req, res) => {
  // request should include a single diet from supported diet list
  // query to databse to update diet
  // send "successfully updated diet"
  var userId = req.body.uid;
  var diet = req.body.diet;
  Users.updateDiet(userId, diet)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put("/updateIntolerances", (req, res) => {
  // request should include intolerances from supported intolerance list
  // query database to update intolerances
  // send "successfully updated intolerances"
  var userId = req.body.uid;
  var intolerances = req.body.intolerances;
  Users.updateIntolerances(userId, intolerances)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/addToFavorites", (req, res) => {
  // request should include user id and recipeId
  // query database to update note
  var userId = req.body.uid;
  var recipeId = req.body.recipeId;
  Users.saveRecipeToUser(userId, recipeId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.delete("/removeFromFavorites", (req, res) => {
  // request should include user id and recipeId
  // query database to update note
  var userId = req.body.uid;
  var recipeId = req.body.recipeId;
  Users.removeRecipeFromUser(userId, recipeId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put("/updateUsername", (req, res) => {
  // request should include uid and new username
  // query database to update note
  var userId = req.body.uid;
  var newUsername = req.body.newUsername;
  Users.updateUsername(userId, newUsername)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put("/updateProfilePic", (req, res) => {
  // request should include uid and new profile pic url
  // query database to update note
  var userId = req.body.uid;
  var newProfilePicUrl = req.body.newProfilePic;
  Users.updateProfilePic(userId, newProfilePicUrl)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put("/updateNote", (req, res) => {
  // request should include user id and note
  // query database to update note
  var userId = req.body.uid;
  var newNote = req.body.note;
  Users.updateNote(userId, newNote)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put("/updateUpvote", (req, res) => {
  // request should include recipe id
  // query database to update upvote
  var recipeId = req.body.recipeId;
  Recipes.upVote(recipeId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/getRecipes", (req, res) => {
  Recipes.getRecipes()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put("/updateDownvote", (req, res) => {
  // request should include recipe id
  // query database to update downvote
  var recipeId = req.body.recipeId;
  Recipes.downVote(recipeId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
