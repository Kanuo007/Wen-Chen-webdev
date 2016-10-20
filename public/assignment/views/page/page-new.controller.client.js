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

        vm.page = {_id: "", name: "", websiteId: ""};
        vm.page. _id = vm.websiteId + vm.userId+ Math.floor((Math.random() * 10) + 1);
        vm.page.websiteId = vm.websiteId;

        vm.newPage = newPage;

        /* any actions you want control to take when you first loads,
         use init() function, it like tags or labels */
        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();

        function newPage(){
            PageService.createPage(vm.websiteId,  vm.page);
            $location.url("/user/" +  vm.page. _id + "/website/" +  vm.websiteId + "/page/" + vm.page. _id);
        }
    }


})();

