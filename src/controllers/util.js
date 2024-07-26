const { json } = require("sequelize");

function removeDeletedAtFromJson(obj){
    const jsonWithoutPassword = obj.toJSON();
    
    if(jsonWithoutPassword.deletedAt !== undefined){
        delete jsonWithoutPassword.deletedAt;
    }

    return jsonWithoutPassword;
}

module.exports = {
    removeDeletedAtFromJson
};