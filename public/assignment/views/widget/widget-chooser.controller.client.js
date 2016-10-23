/**
 * Created by wenchen on 10/9/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController)

    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.newWidget = newWidget;


        function init() {
            vm.Types = WidgetService.getTypes();
        }

        init();


        function newWidget(type) {
            console.log(type);
            switch (type) {
                case "HEADER":
                    vm.widget = {_id: "", widgetType: "", pageId: "", size: 0, "text": ""};
                    break;
                case "HTML":
                    vm.widget = {_id: "", widgetType: "", pageId: "", text: ""};
                    break;
                case "IMAGE":
                    vm.widget = {_id: "", widgetType: "", pageId: "", width: "", url: ""};
                    break;
                case "YOUTUBE":
                    vm.widget = {_id: "", widgetType: "", pageId: "", width: "", url: ""};
                    break;
                default: vm.widget = null;
            }
            if (vm.widget === null){
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/new" );
            }else {
                vm.widget.widgetType = type;
                vm.widget._id = vm.widget.widgetType + Math.floor((Math.random() * 10) + 1);
                vm.widget.pageId = vm.pid;
                WidgetService.createWidget(vm.widget.pageId, vm.widget);
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + vm.widget._id);
            }
        }


    }

})();