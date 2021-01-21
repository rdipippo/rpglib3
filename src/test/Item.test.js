let GameStateField = require("../GameStateField").model;
let GameState = require("../GameState").model;
let Item = require("../Item").model;
let InventorySlot = require('../InventorySlot').model
let StaticModifier = require("../StaticModifier").model;
let mongoose = require('mongoose');
let fs = require('fs');
let aggregate = mongoose.Aggregate;

beforeAll(async () => {
    const globalConfig = JSON.parse(fs.readFileSync("globalConfig.json", 'utf-8'));
    await mongoose.connect(globalConfig.mongoUri, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    });
});

afterAll(async () => {
    await mongoose.disconnect();
});

test('Modifiers are applied on equip and unapplied on unequip', () => {
    let myTestField = new GameStateField({baseVal: 18, modifiers: []});
    let myState = new GameState({ field1: myTestField});
    let modifier = new StaticModifier({fieldName: 'field1', sourceId: new mongoose.mongo.ObjectId('abcdefghijkl'), amount: 100});

    let item = new Item({name: "Staff of Unit Testing", equipModifiers: [modifier]});
    item.equip(myState);

    expect(myState.field1.value()).toEqual(118);

    item.unequip(myState);

    expect(myState.field1.value()).toEqual(18);
});

test('Mongoose',  async (done) => {
    let item = new Item({name: "Staff of Unit Testing", equipModifiers: []});

    await item.save();

    let slot = new InventorySlot({count: 100, itemId: item._id})

    await slot.save();

    let result = await InventorySlot.aggregate().lookup({from: 'items', localField: 'itemId', foreignField: '_id', as: 'item'})
    console.log(result[0])
    let dsh = true;
//expect(false).toBeTruthy();
done();



})