const express = require("express");
const path = require("path");
const app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/getRecipesFromIngredients", (req, res) => {
  // request should include diet, dietary restrictions, and ingredients
  // send request to spoonacular
  // parse response into example object
  // send example object back to the front-end
  res.send("getRecipesFromIngredients");
});

app.get("/getUserInfo", (req, res) => {
  // request should include user id
  // queries database for user object
  // send user object back to front-end
  res.send("getUserInfo");
});

app.get("/getFeaturedRecipes", (req, res) => {
  // queries database for most upvoted recipes
  // send ids to spoonacular
  // send back most upvoted recipes
  res.send("getFeaturedRecipes");
});

app.post("/createUser", (req, res) => {
  // request should include UID from firebase
  // query database to create a new user
  // send "successfully created new user"
  res.send("createUser");
});

app.get("/authenticate", (req, res) => {
  // request should include UID from firebase
  // query database to create a new user
  // send "successfully created new user"
  res.send("authenticate");
});

app.put("/updateIngredients", (req, res) => {
  // request should contain ingredients
  // query database to update ingredients
  // send "successfully updated ingredients"
  res.send("updateIngredients");
});

app.put("/updateDiet", (req, res) => {
  // request should include a single diet from supported diet list
  // query to databse to update diet
  // send "successfully updated diet"
  res.send("updateDiet");
});

app.put("/updateIntolerances", (req, res) => {
  // request should include intolerances from supported intolerance list
  // query database to update intolerances
  // send "successfully updated intolerances"
  res.send("updateIntolerances");
});

app.put("/updateUpvote", (req, res) => {
  // request should include recipe id
  // query database to update upvote
  res.send("updateUpvote");
});

app.put("/updateDownvote", (req, res) => {
  // request should include recipe id
  // query database to update downvote
  res.send("updateDownvote");
});

app.put("/updateNote", (req, res) => {
  // request should include user id and note
  // query database to update note
  res.send("updateNote");
});

app.put("/updateFavorites", (req, res) => {
  // request should include user id and recipeId
  // query database to update note
  res.send("updateFavorites");
});

app.put("/updateUsername", (req, res) => {
  // request should include user id and recipeId
  // query database to update note
  res.send("updateUsername");
});

app.put("/updateProfilePic", (req, res) => {
  // request should include user id and recipeId
  // query database to update note
  res.send("updateProfilePic");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
