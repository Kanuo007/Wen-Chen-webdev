/**
 * Created by wenchen on 10/9/16.
 */



(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController)





    function NewWebsiteController($location, $routeParams, WebsiteService){
        /* do not use scope here */
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.newWebsite = newWebsite;


        vm.website =  {_id: "", name: "", developerId: ""};
        vm.website._id = vm.website.name + Math.floor((Math.random() * 10) + 1);
        vm.website.developerId = vm.userId;


            /* any actions you want control to take when you first loads,
             use init() function, it like tags or labels */
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function newWebsite(){
            WebsiteService.createWebsite( vm.website._id , vm.website );
            $location.url("/user/" +  vm.website.developerId  + "/website/" + vm.website._id);

        }
    }



})();