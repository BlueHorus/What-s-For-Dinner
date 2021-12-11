const db = require("../index.js");

module.exports = {
  //only for testing purposes
  getRecipes: () => {
    return db.recipes.find({});
  },

  getTopVotedRecipes: () => {
    return db.recipes.find({}).sort({ vote: -1 }).limit(3);
  },

  upVote: (recipe_id) => {
    return db.recipes.findOneAndUpdate(
      { id: recipe_id },
      { $inc: { vote: 1 } },
      { upsert: true }
    );
  },
  downVote: (recipe_id) => {
    return db.recipes.findOneAndUpdate(
      { id: recipe_id },
      { $inc: { vote: -1 } },
      { upsert: true }
    );
  },

  saveRecipe: (uid, recipe_id) => {
    return db.recipes.findOneAndUpdate(
      { id: recipe_id },
      { $push: { users: uid } },
      { upsert: true }
    );
  },
};
