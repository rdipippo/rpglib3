let Modifier = require("./Modifier");

class StaticModifier extends Modifier {
    constructor(args) {
        super(args);
        this.amount = args.value;
    }

    apply = function(gameState, baseVal) {
        return this.amount;
    };
}

module.exports = StaticModifier;