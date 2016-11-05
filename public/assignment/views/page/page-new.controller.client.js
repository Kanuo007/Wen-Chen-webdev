/**
 * Created by wenchen on 10/9/16.
 */
/**
 * Created by wenchen on 10/9/16.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController)


    function NewPageController($location, $routeParams, PageService){
        /* do not use scope here */
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.newPage = newPage;

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

        function newPage(){
            vm.page. _id = (new Date()).getTime().toString();
            vm.page.websiteId = vm.websiteId;
            var promise = PageService.createPage(vm.websiteId,  vm.page);
            promise
                .success(function(){
                    $location.url("/user/" +  vm.page. _id + "/website/" +  vm.websiteId + "/page/" + vm.page. _id);
                })
                .error(function(){

                })
        }
    }


})();

