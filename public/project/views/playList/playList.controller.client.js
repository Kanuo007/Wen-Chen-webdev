(function() {
    angular
        .module("MusesApp")
        .controller("PlayListController", PlayListController)

    function PlayListController($location, $routeParams, SearchService, UserService, $sce) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.logout = logout;
        vm.playList = [];
        vm.checkSafeUrl = checkSafeUrl;
        vm.deleteSongFromMyPlayList = deleteSongFromMyPlayList;



        function init() {
            var promise = UserService.findUserById(vm.userId);
            promise
                .success(function (user) {
                    if (user != '0') {
                        vm.user = user;
                        // find the song based on user's songId list
                        for (var i = 0; i < vm.user.PlayList.length; i++) {
                            var promise02 = SearchService.searchTrackById(vm.user.PlayList[i]);
                            promise02
                                .success(function (song) {
                                    if (song == null) {
                                        console.log("no song for this songId")
                                    } else {
                                        vm.playList.push(song);
                                    }
                                })
                                .error(function () {
                                    console.log("error")
                                })
                        }
                        console.log(user.PlayList);
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



        function deleteSongFromMyPlayList(trackId){
            var index = -1;
            console.log(trackId);
            console.log(vm.user.PlayList);
            for (var i = 0; i < vm.user.PlayList.length; i++) {
                if (vm.user.PlayList[i] == trackId) {
                    console.log("find delete");
                    index = i;
                    break;
                }
            }
            if (index != -1) {

                vm.user.PlayList.splice(index, 1);
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