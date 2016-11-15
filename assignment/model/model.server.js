/**
 * Created by wenchen on 11/14/16.
 */
module.exports = function() {
    var mongoose = require ('mongoose');
    mongoose.connect('mongdb://localhost/wam-fall-2016');

    var userModel = require("./user/user.model.server")();
    // var websiteModel = require("./website/website.model.server")();
    // var pageModel = require("./page/page.model.server")();
    // var widgetModel = require("./widget/widget.model.server")();

    // var user = {
    //     username: 'alice',
    //     password : '111'
    // };
    //
    // userModel.createUser(user);

    var model = {
        userModel: userModel
        // websiteModel: websiteModel,
        // pageModel: pageModel,
        // widgetModel: widgetModel
    };

    return model;
};