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
                UserService
                    .createUser(username,password)
                    .success(function(user){
                        $location.url("/user/" + user._id);
                    })
                    .error(function(){

                    })
            } else {
                vm.error = "password is different with vary password";
            }
        }
    }

})();