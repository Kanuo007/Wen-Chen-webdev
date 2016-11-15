/**
 * Created by wenchen on 11/14/16.
 */


module.exports = function () {
    var mongoose = require("mongoose");
    var WebsiteSchema = mongoose.Schema({

    }, {collection: "Website"});
    return WebsiteSchema;
};