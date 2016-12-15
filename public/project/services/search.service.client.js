/**
 * Created by wenchen on 12/10/16.
 */

(function() {
    angular
        .module("MusesApp")
        .factory("SearchService", SearchService);

    function SearchService($http){
        var api = {
            searchArtist : searchArtist,
            searchAlbum : searchAlbum,
            searchTrack : searchTrack,
            searchArtistById : searchArtistById,
            searchAlbumById : searchAlbumById,
            searchTrackById : searchTrackById,
            getTopTracksByArtist : getTopTracksByArtist,
            getAlbumsByArtist : getAlbumsByArtist,
            getRelatedArtistByArtist : getRelatedArtistByArtist,
            getTracksByAlbum : getTracksByAlbum
        };
        return api;



        function searchArtist(searchTerm){
            var url = "https://api.spotify.com/v1/search?type=artist&q="+ searchTerm;
            return $http.get(url);
        }

        function searchAlbum(searchTerm){
            var url = "https://api.spotify.com/v1/search?type=album&q="+ searchTerm;
            return $http.get(url);

        }

        function searchTrack(searchTerm){
            var url = "https://api.spotify.com/v1/search?type=track&q="+ searchTerm;
            return $http.get(url);
        }

        function searchArtistById(artistId){
            var url = "https://api.spotify.com/v1/artists/" + artistId;
            return $http.get(url);
        }

        function searchAlbumById(albumId) {
            var url = "https://api.spotify.com/v1/albums/" + albumId;
            return $http.get(url);
        }

        function searchTrackById(trackId) {
            var url = "https://api.spotify.com/v1/tracks/" + trackId;
            return $http.get(url);
        }

        function getTopTracksByArtist(artistId) {
            var url = "https://api.spotify.com/v1/artists/"+artistId+"/top-tracks?country=US";
            return $http.get(url);
        }

        function getAlbumsByArtist(artistId) {
            var url = "https://api.spotify.com/v1/artists/"+artistId+"/albums";
            return $http.get(url);
        }

        function getRelatedArtistByArtist(artistId){
            var url = "https://api.spotify.com/v1/artists/"+artistId+"/related-artists";
            return $http.get(url);
        }

        function getTracksByAlbum(albumId) {
            var url = "https://api.spotify.com/v1/albums/"+albumId+"/tracks";
            return $http.get(url);
        }


    }
})();