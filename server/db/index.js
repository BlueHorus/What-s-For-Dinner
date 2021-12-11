const mongoose = require("mongoose");

let db = mongoose.connect("mongodb://127.0.0.1:27017/oceanDB");

let userSchema = mongoose.Schema({
  uid: { type: String },
  userName: { type: String },
  profilePic: { type: String },

  ingredients: { type: String },
  notes: { type: String },
  diet: { type: String },
  intolerances: { type: String },
});

let recipeSchema = mongoose.Schema({
  id: { type: String },
  vote: { type: Number },
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
