/**
 * Created by wenchen on 11/14/16.
 */


module.exports = function() {
    var model = {};
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api = {
        createWidget : createWidget,
        findWidgetsByPageId: findWidgetsByPageId,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        setModel: setModel

        // sortWidget: sortWidget
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWidget(widget){
        return WidgetModel.create(widget)

    }



    //Retrieves all widgets for parent page whose id is pageId
    function findWidgetsByPageId(pageId) {
        return WidgetModel.find({
            "pageId" : pageId
        })
    }

    function findWidgetById(wid) {
        return WidgetModel.findById(wid);
    }

    function updateWidget(widgetId, widget) {
        if(widget.rows == null){
           widget.rows = 0;
        }
        if(widget.size == null){
            widget.size = 0;
        }
        if(widget.deletable == null){
            widget.deletable = true;
        }

        if(widget.formatted == null){
            widget.formatted = true;
        }

        return WidgetModel.update({
            _id: widgetId
        },
        {
            "pageId": widget.pageId,
            "widgetType": widget.widgetType,
            "name": widget.name,
            "text": widget.text,
            "placeholder": widget.placeholder,
            "description": widget.description,
            "url": widget.url,
            "width": widget.width,
            "height": widget.height,
            "rows": widget.rows,
            "size": widget.size,
            "class": widget.class,
            "icon": widget.icon,
            "deletable": widget.deletable,
            "formatted": widget.formatted,
            "dateCreated": Date.now()

        });
    }


    function deleteWidget(widgetId) {
        return WidgetModel
            .remove({_id: widgetId});
    }





    // function sortWidget(pageId, start, end) {
    //     return WidgetModel.splice(end, 0, WidgetModel.splice(start, 1)[0]);
    // }

};