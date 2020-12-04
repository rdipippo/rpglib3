let GameStateField = require('../GameStateField').model;
let StaticModifier = require('../StaticModifier').model;
let PercentModifier = require('../PercentModifier').model;
let GameState = require('../GameState').model;
let mongoose = require('mongoose');

test('Static Modifier', () => {
   let myTestField = new GameStateField({baseVal: 18, modifiers: []});
   let myTest = new GameState({ field1: myTestField });
   myTest.applyModifier('field1', new StaticModifier({sourceId: new mongoose.mongo.ObjectId('abcdefghijkl'), amount: 3}))

   expect(myTest['field1'].value()).toEqual(21);

   myTest.unapplyModifier('field1', new StaticModifier({sourceId: new mongoose.mongo.ObjectId('abcdefghijkl'), amount: 3}));

   expect(myTest['field1'].value()).toEqual(18);
});

test('Percent Modifier', () => {
   let myTestField = new GameStateField({baseVal: 10, modifiers: []});
   let myTest = new GameState({ field1: myTestField });
   myTest.applyModifier('field1', new PercentModifier({amount: 30}));

   expect(myTest['field1'].value()).toEqual(13);
});

test('Static and Percent Modifier', () => {
   let myTestField = new GameStateField({baseVal: 10, modifiers: []});
   let myTest = new GameState({ field1: myTestField });

   myTest.applyModifier('field1', new PercentModifier({amount: 50}));
   myTest.applyModifier('field1', new StaticModifier({amount: 3}))

   expect(myTest['field1'].value()).toEqual(18);
});

