class Item {
    constructor(schema) {
        this.name = schema.name
        this.equipModifiers = schema.equipModifiers
    }

    equip =
        function (gameState) {
            this.equipModifiers.forEach(modifier => gameState.applyModifier(modifier));
        }

    unequip =
        function (gameState) {
            this.equipModifiers.forEach(modifier => gameState.unapplyModifier(modifier));
        }
}
module.exports = Item