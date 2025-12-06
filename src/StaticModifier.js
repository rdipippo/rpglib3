class StaticModifier {
    constructor(args) {
        this.amount = args.value;
        this.fieldName = args.fieldName
    }

    apply = function(gameState, baseVal) {
        return this.amount;
    };
}

module.exports = StaticModifier;