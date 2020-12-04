const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let staticModifierSchema = new Schema({sourceId: mongoose.ObjectId, amount: Number});

staticModifierSchema.methods.apply = function(baseVal) {
   return this.amount;
};

staticModifierSchema.methods.unapply = function(baseVal) {
   return this.amount * -1;
};

module.exports = {
   model: mongoose.model('testMod', staticModifierSchema),
   schema: staticModifierSchema
};
