const mongoose = require("mongoose");

let db = mongoose.connect("mongodb://127.0.0.1:27017/oceanDB");

let ingredientsSchema = mongoose.Schema({
  ingredient: { type: String },
  email: { type: String },
});

let notesSchema = mongoose.Schema({
  note: { type: String },
  email: { type: String },
});

let dietaryRestrictionsSchema = mongoose.Schema({
  dietaryRestriction: { type: String },
  email: { type: String },
});

let userSchema = mongoose.Schema({
  userName: { type: String },
  password: { type: String },
  email: { type: String, unique: true },
  profilePic: { type: String },
  sessionToken: { type: String },

  ingredients: [ingredientsSchema],
  notes: [notesSchema],
  diet: { type: String },
  dietaryRestrictions: [dietaryRestrictionsSchema],
});

let recipeSchema = mongoose.Schema({
  id: { type: String },
  upvote: { type: Number },
  downvote: { type: Number },
  users: [String],
});

let Users = mongoose.model("Users", userSchema);
let RecipesList = mongoose.model("RecipesList", recipeSchema);

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
  recipes: RecipesList,
};
