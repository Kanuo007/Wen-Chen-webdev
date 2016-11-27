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

        function newPage(name, title){
            if (typeof(name) === "undefined" || name === "") {
                vm.error = "Name is required."
            } else {
                var page = {websiteId:vm.websiteId, name: name, title: title};
                var promise = PageService.createPage(vm.websiteId, page);
                promise
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/");
                    })
                    .error(function () {

                    })
            }
        }
    }


})();

