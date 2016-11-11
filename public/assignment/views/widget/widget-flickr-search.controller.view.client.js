/**
 * Created by wenchen on 11/5/16.
 */


(function() {
    angular
        .module("WebAppMaker")
        .controller("ImageSearchController", ImageSearchController);

    function ImageSearchController($http, $routeParams,FlickrService,WidgetService){
        var vm = this;
        vm.pid = $routeParams.pid;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.wgid = $routeParams.wgid;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos(searchTerm){
            console.log(searchTerm);
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var widget = {"_id": vm.wgid, widgetType: "Image", "pageId": vm.pid, "width": "100%",
                "url": url};
            WidgetService
                .UpdateWidget(vm.wgid, widget)
                .then();
        }

    }

});

