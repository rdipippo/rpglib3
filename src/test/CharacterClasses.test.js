let characterClasses = require('../CharacterClasses');

test('Character class list exists.', () => {
    let dbList = characterClasses.dbList;

    dbList.forEach(elem => {
        expect(characterClasses[elem]).toEqual(elem);
        console.log(elem);
    })
})