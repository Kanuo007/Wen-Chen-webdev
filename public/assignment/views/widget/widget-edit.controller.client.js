/**
 * Created by wenchen on 10/9/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController" , EditWidgetController);

    function EditWidgetController($location, $routeParams, WidgetService){
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.pid = $routeParams["pid"];
        vm.wid = $routeParams["wid"];
        vm.wgid = $routeParams["wgid"];
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init(){

            var promise = WidgetService.findWidgetById(vm.wgid);
            promise
                .success(function(widget){
                    vm.widget = widget;
                    console.log("Hit here");
                })
                .error(function(){
                    console.log("error");
                })

        }
        init();

        function updateWidget(){
            var promise = WidgetService.updateWidget(vm.wgid, vm.widget);
            promise
                .success(function(){
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                })
                .error(function(){

                })
        }

        function deleteWidget(){
            var promise = WidgetService.deleteWidget(vm.wgid);
            promise
                .success(function(){
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                })
                .error(function(){

                })
        }


    }

})();
