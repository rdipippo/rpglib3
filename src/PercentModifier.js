class PercentModifier {
    constructor(args) {
        this.amount = args.value;
        this.fieldName = args.fieldName
    }
    
    apply = function(gameState, baseVal) {
        return Math.ceil((this.amount / 100) * baseVal);
    };
}

module.exports = PercentModifier;