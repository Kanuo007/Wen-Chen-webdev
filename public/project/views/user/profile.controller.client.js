/**
 * Created by wenchen on 10/9/16.
 */

(function() {
    angular
        .module("MusesApp")
        .controller("ProfileController", ProfileController)

    function ProfileController($location, $routeParams, UserService) {
            var vm = this;
            vm.userId = $routeParams.uid;
            vm.updateUser = updateUser;
            vm.deleteUser = deleteUser;
            vm.logout = logout;

        function init() {

            var promise = UserService.findUserById(vm.userId);
            promise
                .success(function (user) {
                    if (user != '0') {
                        vm.user = user;
                    }else{
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


        function updateUser(){
            promise = UserService.updateUser(vm.user);
            promise
                .success(function(){
                    $location.url("#/user/"+vm.userId);
                })
                .error(function(){

                });

        }

        function deleteUser(){
            var promise = UserService.deleteUser(vm.user._id);
            promise
                .success(function(){
                    $location.url("#/login");
                })
                .error(function(){

                });
        }
    }

})();