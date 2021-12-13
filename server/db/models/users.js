const db = require("../index.js");

module.exports = {
  //only for testing purposes
  getAllUsers: () => {
    return db.users.find({});
  },

  getUserById: (uid) => {
    return db.users.findOne({ uid: uid });
  },

  createUser: (uid, name, url) => {
    return db.users.create({
      uid: uid,
      userName: name,
      profilePic: url,
    });
  },

  updateDiet: (uid, diet) => {
    return db.users.findOneAndUpdate({ uid: uid }, { diet: diet });
  },

  updateIngredients: (uid, ingredients) => {
    return db.users.findOneAndUpdate(
      { uid: uid },
      { ingredients: ingredients }
    );
  },

  updateIntolerances: (uid, intolerances) => {
    return db.users.findOneAndUpdate(
      { uid: uid },
      { intolerances: intolerances }
    );
  },

  updateNote: (uid, notes) => {
    return db.users.findOneAndUpdate({ uid: uid }, { notes: notes });
  },

  saveRecipeToUser: (uid, recipe_id) => {
    return db.users.findOneAndUpdate(
      { uid: uid },
      { $push: { favoriteRecipes: recipe_id } },
      { upsert: true }
    );
  },

  removeRecipeFromUser: (uid, recipe_id) => {
    return db.users.update(
      { uid: uid },
      { $pull: { favoriteRecipes: recipe_id } }
    );
  },

  updateProfilePic: (uid, url) => {
    return db.users.findOneAndUpdate({ uid: uid }, { profilePic: url });
  },

  updateUsername: (uid, username) => {
    return db.users.findOneAndUpdate({ uid: uid }, { userName: username });
  },
};
