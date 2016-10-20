/**
 * Created by wenchen on 10/9/16.
 */



(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController)


    function NewWebsiteController($routeParams, WebsiteService){
        /* do not use scope here */
        var vm = this;

        vm.userId = $routeParams.uid;

        /* any actions you want control to take when you first loads,
         use init() function, it like tags or labels */
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();
    }



})();