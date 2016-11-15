/**
 * Created by wenchen on 11/14/16.
 */
module.exports = function() {
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser: createUser
    };
    return api;


    function createUser(user){
        UserModel.create(user);
    }
};