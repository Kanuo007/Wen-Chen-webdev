/**
 * Created by wenchen on 11/14/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    // var WebsiteSchema = require("../website/website.schema.server");
    var UserSchema = mongoose.Schema({
        "username" : { type: String, required: true, unique: true},
        "password": { type: String, required: true },
        "firstName" : String,
        "lastName" : String,
        "email" : String,
        "VIP" : { type: Boolean, required: true },
        "LikeArtists": [{type: String}],
        "LikeAlbums": [{type: String}],
        "PlayList": [{type: String}],
        "dateCreated": { type: Date, default: Date.now }
    }, {collection: "user"});
    return UserSchema;
};
