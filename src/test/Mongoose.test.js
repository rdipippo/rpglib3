let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let fs = require('fs');
let GameStateField = require("../GameStateField").model;
let StaticModifier = require("../StaticModifier").model;
let gameStateFieldSchema = require("../GameStateField").schema

let GameState = require("../GameState").model;

//let MockMongoose = require('mock-mongoose').MockMongoose;
//let mockMongoose = new MockMongoose(mongoose);
beforeAll(async () => {
    const globalConfig = JSON.parse(fs.readFileSync("globalConfig.json", 'utf-8'));
    await mongoose.connect(globalConfig.mongoUri, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    });
});

test('Smoke', (done) => {
    let myTestField = new GameStateField({baseVal: 18, modifiers: []});
    let myTest = new GameState({ field1: myTestField});

    myTest.applyModifier({fieldName: 'field1', type: "static", amount: 3});

    myTest.save(function (err, myTest) {
        if (err) return console.error(err);

        GameState.find(function(err, data   ) {
            console.log(data[0].field1);
            console.log(data[0].field1.value());
            done();
        });
    });


});