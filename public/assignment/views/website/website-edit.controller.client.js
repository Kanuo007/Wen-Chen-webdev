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
        vm.weightId = $routeParams.wid;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        /* any actions you want control to take when you first loads,
         use init() function, it like tags or labels */
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website  = WebsiteService.findWebsiteById(vm.weightId);
        }
        init();

        function updateWebsite(){
            WebsiteService.updateWebsite(vm.userId , vm.website );
            vm.success = "Success to update this website!"
            $location.url("/user/" + vm.userId  + "/website/" +  vm.weightId );
        }

        function deleteWebsite(){
            WebsiteService.deleteWebsite(vm.website._id);
            $location.url("/user/" + vm.userId  + "/website");
        }
    }


})();