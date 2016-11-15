/**
 * Created by wenchen on 11/14/16.
 */


module.exports = function () {
    var mongoose = require("mongoose");
    var PageSchema = mongoose.Schema({

    }, {collection: "page"});
    return PageSchema;
};