let GameState = require("../GameState");
let StaticModifier = require("../StaticModifier")
let transform = require('class-transformer');
const PercentModifier = require("../PercentModifier");

test('Static Modifier', () => {
    let gs = new GameState({'strength': {value: 12}})
    let sMod = new StaticModifier({fieldName: 'strength', value: 3})

    gs.applyModifier(sMod);

    expect(gs.getFieldValue('strength')).toEqual(15)

    gs.unapplyModifier(sMod);

    expect(gs.schema['strength'].value).toEqual(12)
});

test('Percent Modifier', () => {
    let gs = new GameState({'strength': {value: 12}})
    let sMod = new PercentModifier({fieldName: 'strength', value: 33})

    gs.applyModifier(sMod);

    expect(gs.getFieldValue('strength')).toEqual(16)

    gs.unapplyModifier(sMod);

    expect(gs.schema['strength'].value).toEqual(12)
});

test('Percent then Static Modifier', () => {
    let gs = new GameState({'strength': {value: 12}})
    let sMod = new StaticModifier({fieldName: 'strength', value: 3})
    let pMod = new PercentModifier({fieldName: 'strength', value: 33})

    gs.applyModifier(pMod);
    gs.applyModifier(sMod);

    expect(gs.getFieldValue('strength')).toEqual(19)

    gs.unapplyModifier(sMod);

    expect(gs.schema['strength'].value).toEqual(12)
})

test('Static then Percent Modifier', () => {
    let gs = new GameState({'strength': {value: 12}})
    let sMod = new StaticModifier({fieldName: 'strength', value: 3})
    let pMod = new PercentModifier({fieldName: 'strength', value: 33})

    gs.applyModifier(sMod);
    gs.applyModifier(pMod);

    expect(gs.getFieldValue('strength')).toEqual(19)

    gs.unapplyModifier(sMod);

    expect(gs.schema['strength'].value).toEqual(12)
})

class User {
    id;
    firstName;
    lastName;
    age;

    getName() {
        return this.firstName + ' ' + this.lastName;
    }

    isAdult() {
        return this.age > 36 && this.age < 60;
    }
}

test('Serialize class', () => {
    /*let sMod = new StaticModifier({fieldName: 'strength', value: 3})
    let x = transform.classToPlain(sMod);
    let y = transform.plainToClass(StaticModifier, x);*/
    let a = new User();
    a.age = 37
    a.firstName = 'Rich'
    a.lastName = 'DiPippo'
    let x = transform.classToPlain(a);
    let y = transform.plainToClass(User, x);
    let dsh = true;
})
