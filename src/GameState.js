let MD5 = require("crypto-js/md5");
let jp = require('jsonpath');

class GameState {
    constructor(schema) {
        this.schema = schema;
    }

    applyModifier =
        function(modifier) {
           let field = jp.query(this.schema, "$." + modifier.fieldName)[0];

           if (field.modifiers === undefined) {
               field.modifiers = [];
           }

           modifier.sourceId = MD5(modifier).toString()
           field.modifiers.push(modifier);
        }

    unapplyModifier =
        function(revertedModifier) {
            let field = jp.query(this.schema, "$." + revertedModifier.fieldName)[0];
        
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
            let field = jp.query(this.schema, "$." + fieldName)[0];
            let totalModifier = 0;

            field.modifiers.forEach(modifier => {
                let individualModifier = modifier.apply(this, field.value);
                totalModifier += individualModifier;
            });

            return field.value + totalModifier;
        }   
 }

 module.exports = GameState;