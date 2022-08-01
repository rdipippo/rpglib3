class PercentModifier {
    constructor(args) {
        this.amount = args.value;
        this.fieldName = args.fieldName
    }
    
    apply = function(baseVal) {
        return Math.ceil((this.amount / 100) * baseVal);
    };

    unapply = function(baseVal) {
        return apply(baseVal) * -1;
    };
}

module.exports = PercentModifier;