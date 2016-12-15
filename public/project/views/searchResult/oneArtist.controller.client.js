(function() {
    angular
        .module("MusesApp")
        .controller("ArtistController", ArtistController);

    function ArtistController($location, $routeParams, SearchService, UserService, $sce) {
        var vm = this;
        vm.id = $routeParams.artistId;
        vm.uid = $routeParams.uid;
        vm.checkSafeUrl = checkSafeUrl;
        vm.goToSearch = goToSearch;
        vm.addtoMyArtists = addtoMyArtists;
        vm.addToMyPlayList = addToMyPlayList;
        var index = -1;



        function init(){
            var promise = SearchService.searchArtistById(vm.id);
            promise
                .success(function(result){
                    vm.artist = result;
                })
                .error(function(){
                    console.log("so such artists");
                });

            var promise02 = SearchService.getTopTracksByArtist(vm.id);
            promise02
                .success(function(result){
                    vm.trackList = result.tracks;
                })
                .error(function(){
                    console.log("so such artists");
                });

            var promise03 = SearchService.getAlbumsByArtist(vm.id);
            promise03
                .success(function(result){
                    vm.albumList = result.items;
                })
                .error(function(){
                    console.log("so such artists");
                });

            var promise04 = UserService.findUserById(vm.uid);
            promise04
                .success(function(user){
                    vm.user = user;
                    for (var i = 0; i < vm.user.LikeArtists.length; i++) {
                        if (vm.user.LikeArtists[i] == vm.id) {
                            index = i;
                            break;
                        }
                    }
                    if (index == -1) {
                        vm.flag = "Like";
                    } else {
                        vm.flag = "UnLike";
                    }
                })
                .error(function(){
                })
        }
        init();

        function goToSearch(searchKey){
            $location.url("/user/" + vm.uid + "/search/" + searchKey);
        }

        function checkSafeUrl(url){
            return $sce.trustAsResourceUrl(url);
        }

        function addtoMyArtists() {
            if (vm.flag == "UnLike") {
                vm.user.LikeArtists.splice(index, 1);
                vm.flag = "Like";
            } else {
                vm.user.LikeArtists.push(vm.id);
                vm.flag = "UnLike";
            }
            var promise02 = UserService.updateUser(vm.user);
            promise02
                .success(function () {
                    $location.url("#/user/" + vm.uid + "/artist/" + vm.id);
                })
                .error(function () {
                    console.log("find user but can not update");
                });

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