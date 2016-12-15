(function() {
    angular
        .module("MusesApp")
        .controller("FavoriteController", FavoriteController)

    function FavoriteController($location, $routeParams, SearchService, UserService, $sce) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.logout = logout;
        vm.artistList = [];
        vm.albumList = [];
        vm.checkSafeUrl = checkSafeUrl;
        vm.deleteFromMyArtists = deleteFromMyArtists;
        vm.deleteFromMyAlbums = deleteFromMyAlbums;


        function init() {
            var promise = UserService.findUserById(vm.userId);
            promise
                .success(function (user) {
                    if (user != '0') {
                        vm.user = user;
                        // find the Artists based on user's artistsId list
                        for (var i = 0; i < vm.user.LikeArtists.length; i++) {
                            var promise02 = SearchService.searchArtistById(vm.user.LikeArtists[i]);
                            promise02
                                .success(function (artist) {
                                    if (artist == null) {
                                        console.log("no artisit for this artistId")
                                    } else {
                                        vm.artistList.push(artist);
                                    }
                                })
                                .error(function () {
                                    console.log("error")
                                })
                        }

                        console.log(vm.user.LikeAlbums.length);

                        // find the Artists based on user's artistsId list
                        for (var j = 0; j < vm.user.LikeAlbums.length; j++) {
                            var promise03 = SearchService.searchAlbumById(vm.user.LikeAlbums[j]);
                            promise03
                                .success(function (album) {
                                    if (album == null) {
                                        console.log("no album for this albumId")
                                    } else {
                                        vm.albumList.push(album);
                                    }
                                })
                                .error(function () {
                                    console.log("error")
                                })
                        }

                    } else {
                        console.log("no user found");
                    }
                })
                .error(function () {

                });
        }

        init();

        function logout() {
            var promise = UserService.logout();
            promise
                .success(function(){
                    $location.url("#/login");
                });
        }

        function checkSafeUrl(url){
            return $sce.trustAsResourceUrl(url);
        }

        function deleteFromMyArtists(artistId){
            var index = -1;
            for (var i = 0; i < vm.user.LikeArtists.length; i++) {
                if (vm.user.LikeArtists[i] == artistId) {
                    index = i;
                    break;
                }
            }
            if (index != -1) {
                vm.user.LikeArtists.splice(index, 1);
                var promise02 = UserService.updateUser(vm.user);
                promise02
                    .success(function () {
                        $location.url("#/user/" + vm.userId + "/favorite");
                    })
                    .error(function () {
                        console.log("find user but can not update");
                    });
            }

        }

        function deleteFromMyAlbums(albumId){
            var index = -1;
            for (var i = 0; i < vm.user.LikeAlbums.length; i++) {
                if (vm.user.LikeAlbums[i] == albumId) {
                    index = i;
                    break;
                }
            }
            if (index != -1) {
                vm.user.LikeAlbums.splice(index, 1);
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
    }

})();