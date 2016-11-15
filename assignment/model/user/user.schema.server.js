/**
 * Created by wenchen on 11/14/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        "username" : String,
        "password": String,
        "firstName" : String,
        "lastName" : String,
        "emails" : [String],
        "phones" : [String]
    }, {collection: "user"});
    return UserSchema;
};