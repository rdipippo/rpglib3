const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const gameStateFieldSchema = require("./GameStateField").schema;
const itemSchema = require("./Item").schema;

let staticModifierSchema = new Schema({sourceId: mongoose.ObjectId, amount: Number}, {discriminatorKey: 'type'});

staticModifierSchema.methods.apply = function(baseVal) {
   return this.amount;
};

staticModifierSchema.methods.unapply = function(baseVal) {
   return this.amount * -1;
};

let modifierArray = gameStateFieldSchema.path("modifiers");
modifierArray.discriminator("static", staticModifierSchema);

modifierArray = itemSchema.path("equipModifiers");
modifierArray.discriminator("static", staticModifierSchema);

module.exports = {
   model: mongoose.model('testMod', staticModifierSchema),
   schema: staticModifierSchema
};
