/**
 * Created by wenchen on 10/9/16.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)


    function WebsiteListController($routeParams, WebsiteService){
        /* do not use scope here */

        var vm = this;

        vm.userId = $routeParams.uid;

        /* any actions you want control to take when you first loads,
        use init() function, it like tags or labels */
        function init() {
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise
                .success(function(websites){
                    vm.websites = websites;
                })
                .error(function(){

                })
        }
        init();
    }



})();