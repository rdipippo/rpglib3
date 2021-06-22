class StaticModifier {
    constructor(args) {
        this.amount = args.value;
    }

    apply = function(baseVal) {
        return this.amount;
    };

    unapply = function(baseVal) {
        return this.amount * -1;
    };
}

module.exports = StaticModifier;