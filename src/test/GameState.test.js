let GameState = require("../GameState");
let StaticModifier = require("../StaticModifier")
const PercentModifier = require("../PercentModifier");
let CustomModifier = require("../CustomModifier");

test('Static Modifier', () => {
    let gs = new GameState({'strength': {value: 12}})
    let sMod = new StaticModifier({fieldName: 'strength', value: 3})

    gs.applyModifier(sMod);

    expect(gs.getFieldValue('strength')).toEqual(15)

    gs.unapplyModifier(sMod);

    expect(gs.getFieldValue('strength')).toEqual(12)
});

test('Percent Modifier', () => {
    let gs = new GameState({'strength': {value: 12}})
    let sMod = new PercentModifier({fieldName: 'strength', value: 33})

    gs.applyModifier(sMod);

    expect(gs.getFieldValue('strength')).toEqual(16)

    gs.unapplyModifier(sMod);

    expect(gs.getFieldValue('strength')).toEqual(12)
});

test('Temporary Modifier', () => {
    let gs = new GameState({'strength': {value: 12}})
    let sMod = new StaticModifier({fieldName: 'strength', value: 3, numActions: 2, actionType: 'endTurn'})

    gs.applyModifier(sMod);

    expect(gs.getFieldValue('strength')).toEqual(15)

    gs.doAction('endTurn');

    expect(gs.getFieldValue('strength')).toEqual(15)

    gs.doAction('endTurn');

    expect(gs.getFieldValue('strength')).toEqual(12)
})

test('Percent then Static Modifier', () => {
    let gs = new GameState({'strength': {value: 12}})
    let pMod = new PercentModifier({fieldName: 'strength', value: 33})
    let sMod = new StaticModifier({fieldName: 'strength', value: 3})

    gs.applyModifier(pMod);
    gs.applyModifier(sMod);

    expect(gs.getFieldValue('strength')).toEqual(19)

    gs.unapplyModifier(pMod);

    expect(gs.getFieldValue('strength')).toEqual(15)
})

test('Static then Percent Modifier', () => {
    let gs = new GameState({'strength': {value: 12}})
    let sMod = new StaticModifier({fieldName: 'strength', value: 3})
    let pMod = new PercentModifier({fieldName: 'strength', value: 33})

    gs.applyModifier(sMod);
    gs.applyModifier(pMod);

    expect(gs.getFieldValue('strength')).toEqual(19)

    gs.unapplyModifier(sMod);

    expect(gs.getFieldValue('strength')).toEqual(16)
})

test('Serialize class', () => {
    let sMod = new StaticModifier({fieldName: 'strength', value: 3})
    let x = JSON.stringify(sMod);
    let y = JSON.parse(x);
    expect(y.fieldName).toEqual('strength')
    expect(y.amount).toEqual(3)
    let sm = new StaticModifier(y);
    Object.assign(sm, y);
    expect(sm.apply(null, 12)).toEqual(3)
})

test('Min/Max value on modifier', () => {
    let gs = new GameState({'strength': {value: 12, maxValue: 13, minValue: 10}})
    let sMod = new StaticModifier({fieldName: 'strength', value: 3})

    gs.applyModifier(sMod);

    expect(gs.getFieldValue('strength')).toEqual(13)

    let sMod2 = new StaticModifier({fieldName: 'strength', value: -30})

    gs.applyModifier(sMod2);
    
    expect(gs.getFieldValue('strength')).toEqual(10)
})    

test('Negative value on modifier', () => {
    let gs = new GameState({'strength': {value: 12}})
    let sMod = new StaticModifier({fieldName: 'strength', value: -15})

    gs.applyModifier(sMod);

    expect(gs.getFieldValue('strength')).toEqual(0)

    gs.schema.strength.allowNegative = true;
    
    expect(gs.getFieldValue('strength')).toEqual(-3)
})    

test('Custom Modifier', () => {
    let gs = new GameState({'strength': {value: 12}})
    let cMod = new CustomModifier({fieldName: 'strength', apply: (gameState, baseVal) => { return 3 }})

    gs.applyModifier(cMod);

    expect(gs.getFieldValue('strength')).toEqual(15)

    gs.unapplyModifier(cMod);

    expect(gs.getFieldValue('strength')).toEqual(12)
})
