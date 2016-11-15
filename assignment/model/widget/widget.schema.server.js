/**
 * Created by wenchen on 11/14/16.
 */

module.exports = function () {
    var mongoose = require("mongoose");
    var WidgetSchema = mongoose.Schema({

    }, {collection: "Widget"});
    return WidgetSchema;
};