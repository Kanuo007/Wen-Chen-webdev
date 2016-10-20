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
        vm.user =  {_id: "", username: "",    password: "",    firstName: "",  lastName: ""};
        vm.user._id = vm.user.username + Math.floor((Math.random() * 10) + 1);

        function register(username, password, varyPassword){
            if (password === varyPassword){
                UserService.createUser(vm.user);
                $location.url("/user/" + vm.user._id);
            } else {
                vm.error = "password is different with vary password";
            }
        }
    }

})();