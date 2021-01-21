const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const gameStateFieldSchema = require("./GameStateField").schema;
const characterClasses = require('./CharacterClasses');

let gameStateSchema = new Schema({field1: gameStateFieldSchema,
                                  characterClass: {
                                     type: String,
                                     enum: characterClasses.dbList
                                  },
                                  inventory: []});

gameStateSchema.methods.applyModifier =
    function(modifier) {
       let field = this[modifier.fieldName];
       field.modify(modifier);
    }

gameStateSchema.methods.unapplyModifier =
    function(modifier) {
        let field = this[modifier.fieldName];
        field.revert(modifier);
    }

module.exports = {
   model: mongoose.model('gameState', gameStateSchema),
   schema: gameStateSchema
};