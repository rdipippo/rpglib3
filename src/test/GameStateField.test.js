let GameStateField = require('../GameStateField').model;
let StaticModifier = require('../StaticModifier').model;
let PercentModifier = require('../PercentModifier').model;
let GameState = require('../GameState').model;
let mongoose = require('mongoose');
const Schema = mongoose.Schema;

test('Static Modifier', () => {
   let myTestField = new GameStateField({baseVal: 18, modifiers: []});
   let myTest = new GameState({ field1: myTestField });
   myTest.applyModifier(new StaticModifier({fieldName: 'field1', sourceId: new mongoose.mongo.ObjectId('abcdefghijkl'), amount: 3}));

   expect(myTest['field1'].value()).toEqual(21);

   myTest.unapplyModifier(new StaticModifier({fieldName: 'field1', sourceId: new mongoose.mongo.ObjectId('abcdefghijkl'), amount: 3}));

   expect(myTest['field1'].value()).toEqual(18);
});

test('Percent Modifier', () => {
   let myTestField = new GameStateField({baseVal: 10, modifiers: []});
   let myTest = new GameState({ field1: myTestField });
   myTest.applyModifier(new PercentModifier({fieldName: 'field1', sourceId: new mongoose.mongo.ObjectId('abcdefghijkl'), amount: 30}));

   expect(myTest['field1'].value()).toEqual(13);

   // TODO shouldn't have to pass in a new object to unapply - can apply return source Id instead of user providing it?
   myTest.unapplyModifier(new PercentModifier({fieldName: 'field1', sourceId: new mongoose.mongo.ObjectId('abcdefghijkl'), amount: 30}));

   expect(myTest['field1'].value()).toEqual(10);
});

test('Static and Percent Modifier', () => {
   let myTestField = new GameStateField({baseVal: 10, modifiers: []});
   let myTest = new GameState({ field1: myTestField });

   myTest.applyModifier(new PercentModifier({fieldName: 'field1', amount: 50}));
   myTest.applyModifier(new StaticModifier({fieldName: 'field1', amount: 3}))

   expect(myTest['field1'].value()).toEqual(18);
});

