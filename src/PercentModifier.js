const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const gameStateFieldSchema = require("./GameStateField").schema;
const itemSchema = require("./Item").schema;

let percentModifierSchema = new Schema({sourceId: mongoose.ObjectId, amount: Number}, {discriminatorKey: 'type'});

percentModifierSchema.methods.apply = function(baseVal) {
   return (this.amount / 100) * baseVal;
};

percentModifierSchema.methods.unapply = function(baseVal) {
   return apply(baseVal) * -1;
};

let modifierArray = gameStateFieldSchema.path("modifiers");
modifierArray.discriminator("percent", percentModifierSchema);

// TODO do we have to do this for every array of modifiers? either disperse to the classes that use modifiers or find another way
modifierArray = itemSchema.path("equipModifiers");
modifierArray.discriminator("percent", percentModifierSchema);

module.exports = {
   model: mongoose.model('testPMod', percentModifierSchema),
   schema: percentModifierSchema
};