/**
 * Created by wenchen on 10/9/16.
 */
/**
 * Created by wenchen on 10/9/16.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController)


    function EditPageController($location, $routeParams, PageService){
        /* do not use scope here */
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;



        function init() {
            var aaa = PageService.findPageByWebsiteId(vm.websiteId);
            aaa
                .success(function(pages){
                    vm.pages = pages;
                })
                .error(function(){

                })

            var promise = PageService.findPageById(vm.pageId);
            promise
                .success(function(page){
                    vm.page = page;
                })
                .error(function(){

                })

        }
        init();

        function updatePage(){
           var promise =  PageService.updatePage(vm.pageId , vm.page );
            promise
                .success(function(){
                    $location.url("/user/" + vm.userId  + "/website/" + vm.websiteId + "/page");
                })
                .error(function(){

                })
        }

        function deletePage(){
            var promise =  PageService.deletePage(vm.pageId);
            promise
                .success(function(){
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                }).error(function(){

                })
        }

    }



})();

