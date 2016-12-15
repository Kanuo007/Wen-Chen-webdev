

(function() {
    angular
        .module("MusesApp")
        .controller("SearchController", SearchController);

    function SearchController($location, $routeParams, UserService, SearchService, $sce) {
        var vm = this;
        vm.searchKey = $routeParams.searchKey;
        vm.uid = $routeParams.uid;
        vm.goToSearch = goToSearch;
        vm.checkSafeUrl = checkSafeUrl;
        vm.addToMyPlayList = addToMyPlayList;



        function init(){
            var promise = SearchService.searchArtist(vm.searchKey);
            promise
                .success(function(result){
                    vm.artistList = result.artists.items;
                })
                .error(function(){
                    console.log("so such artists");
                });

            var promise02 = SearchService.searchAlbum(vm.searchKey);
            promise02
                .success(function(result){
                    vm.albumList = result.albums.items;
                })
                .error(function(){
                    console.log("so such albums");
                });

            var promise03 = SearchService.searchTrack(vm.searchKey);
            promise03
                .success(function(result){
                    vm.trackList = result.tracks.items;
                })
                .error(function(){
                    console.log("so such tracks");
                });

            var promise04 = UserService.findUserById(vm.uid);
            promise04.
                success(function(user) {
                    vm.user = user;
                })
                .error(function(){
                    console.log("so such user");
                })
        }
        init();


        function goToSearch(searchKey){
            $location.url("/user/" + vm.uid + "/search/" + searchKey);
        }

        function checkSafeUrl(url){
            return $sce.trustAsResourceUrl(url);
        }

        function addToMyPlayList(trackId){
            var flag = true;
            for(var i = 0; i < vm.user.PlayList.length; i++){
                if(vm.user.PlayList[i] == trackId){
                    flag = false;
                    break;
                }
            }
            if (flag){
                vm.user.PlayList.push(trackId);
            }

            var promise02 = UserService.updateUser(vm.user);
            promise02
                .success(function () {
                    location.reload();
                })
                .error(function () {
                    console.log("find user but can not update");
                });

            }

    }

})();