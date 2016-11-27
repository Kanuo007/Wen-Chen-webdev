/**
 * Created by wenchen on 11/5/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("MyService", MyService);

    function MyService($http){
        var api = {
            searchPhotos : searchPhotos
        };
        return api;


        function searchPhotos(searchTerm){
            var key = "08f7227714217593a0d7530fbabfaffa";
            var secret = "36c3c40dad098b67";
            var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }
})();