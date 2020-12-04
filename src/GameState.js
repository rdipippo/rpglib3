const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const gameStateFieldSchema = require("./GameStateField").schema;

let gameStateSchema = new Schema({field1: gameStateFieldSchema});

gameStateSchema.methods.applyModifier =
    function(fieldName, modifier) {
       let field = this[fieldName];
       field.modify(modifier);
    }

gameStateSchema.methods.unapplyModifier =
    function(fieldName, modifier) {
        let field = this[fieldName];
        field.revert(modifier);
    }

module.exports = {
   model: mongoose.model('gameState', gameStateSchema),
   schema: gameStateSchema
};