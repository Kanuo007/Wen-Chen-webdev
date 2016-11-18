/**
 * Created by wenchen on 10/9/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

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
                    vm.widget = {widgetType: "", pageId: "", size: 0, "text": ""};
                    break;
                case "HTML":
                    vm.widget = {widgetType: "", pageId: "", text: ""};
                    break;
                case "IMAGE":
                    vm.widget = {widgetType: "", pageId: "", width: "", url: ""};
                    break;
                case "YOUTUBE":
                    vm.widget = {widgetType: "", pageId: "", width: "", url: ""};
                    break;
                case "TEXT":
                    vm.widget = {widgetType: "", pageId: "", text: "", rows: 0, placeholder: "", formatted: false };
                    break;
                default: vm.widget = null;
            }

            if (vm.widget === null){
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/new" );
            }else {
                vm.widget.widgetType = type;
                vm.widget.pageId = vm.pid;

                console.log("In widget controller, vm.widget is: " + vm.widget);
                console.log("In widget controller, vm.widget.widgetType is: " + vm.widget.widgetType);
                console.log("In widget controller, vm.widget.pageId is: " + vm.widget.pageId);

                var promise = WidgetService.createWidget(vm.widget.pageId, vm.widget);

                promise
                    .success(function(widget){
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + widget._id);
                        console.log("here!!!!");
                    })
                    .error(function(){
                        console.log("error!!!!");
                    })
            }
        }


    }

})();