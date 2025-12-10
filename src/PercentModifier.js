let Modifier = require("./Modifier");

class PercentModifier extends Modifier {
    constructor(args) {
        super(args);
        this.amount = args.value;
    }
    
    apply = function(gameState, baseVal) {
        return Math.ceil((this.amount / 100) * baseVal);
    };
}

module.exports = PercentModifier;