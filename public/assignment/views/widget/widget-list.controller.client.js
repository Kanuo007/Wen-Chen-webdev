/**
 * Created by wenchen on 10/9/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController" , WidgetListController);

    function WidgetListController($routeParams,
                                  WidgetService,
                                  $sce){
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.pid = $routeParams["pid"];
        vm.wid = $routeParams["wid"];
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeImage = checkSafeImage;
        vm.checkSafeYoutubeUrl = checkSafeYoutubeUrl;


        function init(){
            var promise = WidgetService.findWidgetsByPageId(vm.pid);
            promise
                .success(function(widgets){
                    vm.widgets = widgets;
                })
                .error(function(){

                })
        }
        init();

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeImage(url) {
            return $sce.trustAsResourceUrl(url);
        }

        function checkSafeYoutubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }


    }

})();
