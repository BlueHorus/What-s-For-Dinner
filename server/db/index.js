const mongoose = require("mongoose");
const CONFIG = require("../../db_config.js");

// "mongodb://127.0.0.1:27017/oceanDB"

let db = mongoose.connect(
  "mongodb+srv://cluster0.lzfom.mongodb.net/oceandb?retryWrites=true&w=majority",
  {
    dbName: CONFIG.dbName,
    user: CONFIG.user,
    pass: CONFIG.pass,
  }
);

let userSchema = mongoose.Schema({
  uid: { type: String },
  userName: { type: String },
  profilePic: { type: String },
  ingredients: { type: String },
  favoriteRecipes: [{ type: String }],
  notes: { type: String },
  diet: { type: String },
  intolerances: { type: String },
});

let recipeSchema = mongoose.Schema({
  id: { type: String },
  vote: { type: Number },
});

let Users = mongoose.model("Users", userSchema);
let RecipesList = mongoose.model("RecipesList", recipeSchema);

db.then(() => console.log(`Connected to: oceandb on Mongodb Atlas`)).catch(
  (err) => {
    console.log(
      `There was a problem connecting to mongo at: ${"mongodb://localhost:27017/oceanDB"}`
    );
    console.log(err);
  }
);

module.exports = {
  users: Users,
  recipes: RecipesList,
};
