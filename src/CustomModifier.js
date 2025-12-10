let Modifier = require("./Modifier");

class CustomModifier extends Modifier {
    constructor(args) {
        super(args);
        this.apply = args.apply
        this.unapply = args.unapply;
    }
    
    apply = function(gameState, baseVal) {
        this.apply(gameState, baseVal);
    };
}

module.exports = CustomModifier;