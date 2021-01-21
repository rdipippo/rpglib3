const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const modifierSchema = require("./Modifier").modifierSchema;

let itemSchema = new Schema({
    name: String,
    equipModifiers: [modifierSchema]
});

itemSchema.methods.equip =
    function(gameState) {
        this.equipModifiers.forEach(modifier => gameState.applyModifier(modifier));
    }

itemSchema.methods.unequip =
    function(gameState) {
        this.equipModifiers.forEach(modifier => gameState.unapplyModifier(modifier));
    }

module.exports = {
    model: mongoose.model('item', itemSchema),
    schema: itemSchema
};