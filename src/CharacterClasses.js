const classList = ['Wizard', 'Warrior', 'Rogue'];

let characterClasses = {dbList: classList};

classList.forEach(elem => characterClasses[elem] = elem);

module.exports = characterClasses;