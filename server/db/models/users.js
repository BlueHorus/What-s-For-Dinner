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
};
