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

        function deletePage(){
            PageService.deletePage(vm.pageId);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();

        function updatePage(){
            PageService.updatePage(vm.pageId , vm.page );
            vm.success = "Success to update this page!"
            $location.url("/user/" + vm.userId  + "/website/" + vm.websiteId + "/page/" + vm.pageId );
        }

        function deleteWebsite(){
            PageService.deletePage(vm.pageId);
            $location.url("/user/" + vm.userId  + "/website/" + vm.websiteId + "/page/");
        }

    }



})();

