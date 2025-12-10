class Modifier {
    constructor(args) {
        this.fieldName = args.fieldName
        if (args.numActions !== undefined) {
            this.numActions = args.numActions;
        }
        if (args.actionType !== undefined) {
            this.actionType = args.actionType;
        }
    }
}

module.exports = Modifier;