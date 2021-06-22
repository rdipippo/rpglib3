class PercentModifier {
    constructor(args) {
        this.amount = args.value;
    }
    
    apply = function(baseVal) {
        return (this.amount / 100) * baseVal;
    };

    unapply = function(baseVal) {
        return apply(baseVal) * -1;
    };
}

module.exports = PercentModifier;