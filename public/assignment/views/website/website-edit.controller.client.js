/**
 * Created by wenchen on 10/9/16.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController)


    function EditWebsiteController($location, $routeParams, WebsiteService){
        /* do not use scope here */
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        /* any actions you want control to take when you first loads,
         use init() function, it like tags or labels */
        function init() {
            var aaa = WebsiteService.findWebsitesByUser(vm.userId);
            aaa
                .success(function(websites){
                    vm.websites = websites;
                })
                .error(function(){

                })

            var promise = WebsiteService.findWebsiteById(vm.wid);
            promise
                .success(function(website){
                    vm.website = website;
                })
                .error(function(){

                })
        }
        init();

        function updateWebsite(){
            var promise =  WebsiteService.updateWebsite(vm.wid , vm.website);
            promise
                .success(function(){
                    $location.url("/user/" + vm.userId  + "/website");
                })
                .error(function(){

                })
        }

        function deleteWebsite(){
            var promise =  WebsiteService.deleteWebsite(vm.website._id);
            promise
                .success(function(){
                    $location.url("/user/" + vm.userId  + "/website");
                }).error(function(){

                })
        }
    }


})();