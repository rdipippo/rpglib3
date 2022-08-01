let MD5 = require("crypto-js/md5");

class GameState {
    constructor(schema) {
        this.schema = schema;
    }

    applyModifier =
        function(modifier) {
           let field = this.schema[modifier.fieldName];

           if (field.modifiers === undefined) {
               field.modifiers = [];
           }

           modifier.sourceId = MD5(modifier).toString()
           field.modifiers.push(modifier);
        }

    unapplyModifier =
        function(revertedModifier) {
            let field = this.schema[revertedModifier.fieldName];
        
            field.modifiers.forEach(modifier => {
               if (modifier.sourceId.toString() === revertedModifier.sourceId.toString()) {
                    field.modifiers = field.modifiers.filter((value, index, arr) => {
                        return value.sourceId.toString() !== revertedModifier.sourceId.toString();
                    })
                }
            });
        }
    
    getFieldValue = 
        function(fieldName) {
            let field = this.schema[fieldName]
            let totalModifier = 0;

            field.modifiers.forEach(modifier => {
                let individualModifier = modifier.apply(field.value);
                totalModifier += individualModifier;
            });

            return field.value + totalModifier;
        }   
 }

 module.exports = GameState;