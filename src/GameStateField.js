const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let StaticModifier = require("./StaticModifier").model;
let staticModifierSchema = require("./StaticModifier").schema
let percentModifierSchema = require("./PercentModifier").schema

let gameStateFieldSchema = new Schema({baseVal: Number, modifiers: [staticModifierSchema|percentModifierSchema]});

gameStateFieldSchema.methods.value =
    function() {
       let totalModifier = 0;

       this.modifiers.forEach(modifier => {
          let individualModifier = modifier.apply(this.baseVal);
          totalModifier += individualModifier;
       });

       return this.baseVal + totalModifier;
    }

gameStateFieldSchema.methods.modify = function(modifier) {
   this.modifiers.push(modifier);
}

gameStateFieldSchema.methods.revert = function(revertedModifier) {
    this.modifiers.forEach(modifier => {
        if (modifier.sourceId.toString() === revertedModifier.sourceId.toString()) {
            this.modifiers = this.modifiers.filter((value, index, arr) => {
               return value.sourceId.toString() !== revertedModifier.sourceId.toString();
            });
        }
    });
}

module.exports = {
   model: mongoose.model('testField', gameStateFieldSchema),
   schema: gameStateFieldSchema
};
