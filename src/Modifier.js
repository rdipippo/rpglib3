const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modifierSchema = new Schema({fieldName: String}, {discriminatorKey: 'type'});
const Modifier = mongoose.model('BaseModifier', modifierSchema);

module.exports =  { modifierSchema: modifierSchema, Modifier: Modifier }
