let StaticModfifier = require('./StaticModifier');

class GameState {
    constructor(schema) {
        this.schema = schema;
    }

    applyModifier =
        function(modifier) {
           let field = this.schema[modifier.fieldName];
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
                let modifierObj = eval("let " + modifier.type + " = require('./" + modifier.type + "'); new " + modifier.type + "(" + JSON.stringify(modifier.args) + ")");
                let individualModifier = modifierObj.apply(field.baseVal);
                totalModifier += individualModifier;
            });

            return field.baseVal + totalModifier;
        }   
 }

 module.exports = GameState;