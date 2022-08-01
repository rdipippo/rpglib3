let GameState = require("../GameState");
let Item = require("../Item");
let StaticModifier = require("../StaticModifier");

test('Modifiers are applied on equip and unapplied on unequip', () => {
    let myState = new GameState({ strength: {value: 18 }});
    let modifier = new StaticModifier({fieldName: 'strength', value: 100});

    let item = new Item({name: "Staff of Unit Testing", equipModifiers: [modifier]});
    item.equip(myState);

    expect(myState.getFieldValue('strength')).toEqual(118);

    item.unequip(myState);

    expect(myState.getFieldValue('strength')).toEqual(18);
});
