/**
 * Created by wenchen on 11/5/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    function FlickrService(){
        var api = {
            searchPhotos : searchPhotos
        };
        return api;

        var key = "your-flickr-key";
        var secret = "your-flickr-secret";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm){
            var promise = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            promise
                .success(function(){
                    return $http.get(url);
                })
                .error(function(){

                })
        }

    }
});