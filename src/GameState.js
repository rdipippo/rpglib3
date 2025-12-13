let MD5 = require("crypto-js/md5");
let jp = require('jsonpath');

class GameState {
    constructor(schema) {
        this.schema = schema;
        this.eventListeners = [];
    }

    doAction =
        function(actionType, params) {
            for (let i = 0; i < this.eventListeners[actionType].length; i++) {
                this.eventListeners[actionType][i].callback.apply(this.eventListeners[actionType][i].context, params);
            }
        };
    
    registerForEvent = 
        function(actionType, callback, context) {
            if (this.eventListeners[actionType] === undefined) {
                this.eventListeners[actionType] = [];
            }
            
            this.eventListeners[actionType].push({callback: callback, context: context});
        };

    applyModifier =
        function(modifier) {
           let field = jp.query(this.schema, "$." + modifier.fieldName)[0];

           if (field.modifiers === undefined) {
               field.modifiers = [];
           }

           if (modifier.numActions !== undefined && modifier.actionType !== undefined) {
               this.registerForEvent(modifier.actionType, (context, params) => { 
                 modifier.numActions--; 
                 if (modifier.numActions <= 0) { 
                    this.unapplyModifier(modifier); } 
                }, this);
           }

           modifier.sourceId = MD5(JSON.stringify(modifier)).toString()
           field.modifiers.push(modifier);
        };

    unapplyModifier =
        function(revertedModifier) {
            let field = jp.query(this.schema, "$." + revertedModifier.fieldName)[0];
        
            field.modifiers?.forEach(modifier => {
               if (modifier.sourceId.toString() === revertedModifier.sourceId.toString()) {
                    field.modifiers = field.modifiers.filter((value, index, arr) => {
                        return value.sourceId.toString() !== revertedModifier.sourceId.toString();
                    })
                }
            });
        };
    
    getFieldValue = 
        function(fieldName) {
            let field = jp.query(this.schema, "$." + fieldName)[0];
            let totalModifier = 0;

            field.modifiers?.forEach(modifier => {
                let individualModifier = modifier.apply(this, field.value);
                totalModifier += individualModifier;
            });

            let modifiedValue = field.value + totalModifier;

            if (field.maxValue !== undefined && modifiedValue > field.maxValue) {
                modifiedValue = field.maxValue;
            }

            return modifiedValue;
        };
}

 module.exports = GameState;
