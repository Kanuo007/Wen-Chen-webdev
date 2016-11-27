/**
 * Created by wenchen on 11/5/16.
 */


(function() {
    angular
        .module("WebAppMaker")
        .controller("myController", myController);

    function myController($http, $location, $routeParams, WidgetService, MyService){
        console.log("hello from myController");
        var vm = this;
        vm.pid = $routeParams.pid;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.wgid = $routeParams.wgid;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos(searchTerm) {
            var promise = MyService.searchPhotos(searchTerm);
            promise
                .success(function(response) {
                    var data = response.replace("jsonFlickrApi(" , "");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var widget = {"_id": vm.wgid, "name": vm.wgid, widgetType: "IMAGE", "pageId": vm.pid, "width": "100%", "url": url};
            WidgetService
                .updateWidget(vm.wgid, widget)
                .success(function(){
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                })
                .error(function(){
                    console.log("error");
                })
        }

    }

})();

