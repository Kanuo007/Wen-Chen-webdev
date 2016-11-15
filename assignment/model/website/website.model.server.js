/**
 * Created by wenchen on 11/14/16.
 */


module.exports = function() {
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

    var api = {
        createWebsite: createWebsite
    };
    return api;


    function createWebsite(page){
        WebsiteModel.create(page);
    }
};