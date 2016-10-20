/**
 * Created by wenchen on 10/9/16.
 */

(function() {
    angular
        .module("WebAppMaker")

        .controller("RegisterController", RegisterController)


    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, varyPassword){

            if (password === varyPassword){
                UserService.createUser(username, password);
                vm.user = UserService.findUserByCredentials(username, password);
                $location.url("/user/" + user._id);
            } else {
                vm.error = "password is different with vary password";
            }
        }
    }

})();