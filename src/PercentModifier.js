const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let percentModifierSchema = new Schema({sourceId: mongoose.ObjectId, amount: Number});

percentModifierSchema.methods.apply = function(baseVal) {
   return (this.amount / 100) * baseVal;
};

percentModifierSchema.methods.unapply = function(baseVal) {
   return apply(baseVal) * -1;
};

module.exports = {
   model: mongoose.model('testPMod', percentModifierSchema),
   schema: percentModifierSchema
};