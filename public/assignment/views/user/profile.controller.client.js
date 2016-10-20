/**
 * Created by wenchen on 10/9/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController)

    function ProfileController($location, $routeParams, UserService) {
            var vm = this;

            var userId = $routeParams.uid;

            var user = UserService.findUserById(userId);
            vm.updateUser = updateUser;


            if (user != null){
                vm.user = user;
            }else{
                return null;
            }

            function updateUser(){
                UserService.updateUser(userId,user);
                vm.success = "Success to update your profile!"
                $location.url(  "/user/" + userId);
            }
    }

})();