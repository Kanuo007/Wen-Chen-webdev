/**
 * Created by wenchen on 10/9/16.
 */
/**
 * Created by wenchen on 10/9/16.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)


    function PageListController($routeParams, PageService){
        /* do not use scope here */
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        /* any actions you want control to take when you first loads,
         use init() function, it like tags or labels */
        function init() {
            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise
                .success(function(pages){
                    vm.pages = pages;
                })
                .error(function(){

                })
        }
        init();
    }

})();



