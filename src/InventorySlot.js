const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let inventorySlotSchema = new Schema({count: Number, itemId: ObjectId });

module.exports = {
    model: mongoose.model('inventorySlot', inventorySlotSchema),
    schema: inventorySlotSchema
};