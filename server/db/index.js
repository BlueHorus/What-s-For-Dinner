const mongoose = require("mongoose");

let db = mongoose.connect("mongodb://127.0.0.1:27017/oceanDB");

let myRecipeSchema = mongoose.Schema({
  id: { type: String },
  upVoted: { type: Boolean },
  downVoted: { type: Boolean },
});

let userSchema = mongoose.Schema({
  userName: { type: String },
  password: { type: String },
  email: { type: String, unique: true },
  profilePic: { type: String },
  accessToken: { type: String },

  ingredients: [String],
  notes: [String],
  recipes: [myRecipeSchema],
});

let recipeSchema = mongoose.Schema({
  id: { type: String },
  upvote: [String],
  downvote: [String],
});

let Users = mongoose.model("Users", userSchema);
let Recipes = mongoose.model("Recipes", recipeSchema);

db.then(() =>
  console.log(`Connected to: ${"mongodb://localhost:27017/oceanDB"}`)
).catch((err) => {
  console.log(
    `There was a problem connecting to mongo at: ${"mongodb://localhost:27017/oceanDB"}`
  );
  console.log(err);
});

module.exports = {
  users: Users,
  recipes: Recipes,
};
