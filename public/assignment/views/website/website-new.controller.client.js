/**
 * Created by wenchen on 10/9/16.
 */



(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController)





    function NewWebsiteController($location, $routeParams, WebsiteService){
        /* do not use scope here */
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function init() {
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise
                .success(function(websites){
                    vm.websites = websites;
                });
        }
        init();

        function createWebsite(name, description){
            if (typeof(name) === "undefined" || name === "") {
                vm.error = "Name is required."
            } else {
                var newWebSite = {developerId: vm.userId, name: name, description: description}
                var promise = WebsiteService.createWebsite(newWebSite._id, newWebSite);
                promise
                    .success(function () {
                        $location.url("/user/" + newWebSite.developerId + "/website");
                    });
            }
        }
    }



})();