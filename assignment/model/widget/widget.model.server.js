/**
 * Created by wenchen on 11/14/16.
 */


module.exports = function() {
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api = {
        createWidget : createWidget
    };
    return api;


    function createWidget(widget){
        WidgetModel.create(widget);
    }
};