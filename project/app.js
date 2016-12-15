/**
 * Created by wenchen on 11/23/16.
 */
// declear node.js module

module.exports = function(app) {

    var model = require("./model/model.server.js")();

    require("./services/user.service.server.js")(app, model);

};
