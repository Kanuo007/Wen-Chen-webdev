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
                })
                .error(function(){
                })

        }
        init();

        function updateWidget(){
            if (typeof(vm.widget.name) === "undefined" || vm.widget.name === ""){
                vm.error = "Name is required."
            } else {
                var promise = WidgetService.updateWidget(vm.wgid, vm.widget);
                promise
                    .success(function () {
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                    })
                    .error(function () {

                    })
            }
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
