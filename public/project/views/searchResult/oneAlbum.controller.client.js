(function() {
    angular
        .module("MusesApp")
        .controller("AlbumController", AlbumController);

    function AlbumController($http, $location, $routeParams, SearchService, UserService, $sce) {
        var vm = this;
        vm.id = $routeParams.albumId;
        vm.uid = $routeParams.uid;
        vm.checkSafeUrl = checkSafeUrl;
        vm.goToSearch = goToSearch;
        vm.addtoMyAlbums = addtoMyAlbums;
        vm.addToMyPlayList = addToMyPlayList;
        var index = -1;



        function init(){
            var promise = SearchService.searchAlbumById(vm.id);
            promise
                .success(function(result){
                    vm.album = result;
                })
                .error(function(){
                    console.log("so such album");
                });

            var promise02 = SearchService.getTracksByAlbum(vm.id);
            promise02
                .success(function(result){
                    vm.trackList = result.items;
                })
                .error(function(){
                    console.log("so such album");
                });

            var promise03 = UserService.findUserById(vm.uid);
            promise03
                .success(function(user){
                    vm.user = user;
                    for (var i = 0; i < vm.user.LikeAlbums.length; i++) {
                        if (vm.user.LikeAlbums[i] == vm.id) {
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

        function addtoMyAlbums() {
            if (vm.flag == "UnLike") {
                vm.user.LikeAlbums.splice(index, 1);
                vm.flag = "Like";
            } else {
                vm.user.LikeAlbums.push(vm.id);
                vm.flag = "UnLike";
            }
            var promise = UserService.updateUser(vm.user);
            promise
                .success(function () {
                    $location.url("#/user/" + vm.uid + "/album/" + vm.id);
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