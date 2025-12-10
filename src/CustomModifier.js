class CustomModifier {
    constructor(args) {
        this.fieldName = args.fieldName
        this.apply = args.apply
        this.unapply = args.unapply;
    }
    
    apply = function(gameState, baseVal) {
        this.apply(gameState, baseVal);
    };
}

module.exports = CustomModifier;