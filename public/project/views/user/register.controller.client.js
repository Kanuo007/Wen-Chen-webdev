/**
 * Created by wenchen on 10/9/16.
 */

(function() {
    angular
        .module("MusesApp")

        .controller("RegisterController", RegisterController)


    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, varyPassword){
            if ((typeof(username) === "undefined" || username === "") ||
                (typeof(password) === "undefined" || password === "") ||
                (typeof(varyPassword) === "undefined" || varyPassword === "")) {
                vm.error = "UserName, Password and Vary Password are all required."
            } else {
                UserService
                    .findUserByUserName(username)
                    .success(function (user) {
                        if (user == 0) {
                            if (password === varyPassword) {
                                UserService
                                    .createUser(username, password)
                                    .success(function (user) {
                                        $location.url("/user/" + user._id +"/homePage");
                                    })
                                    .error(function () {

                                    })
                            } else {
                                vm.error = "password is different with vary password";
                            }
                        } else {
                            vm.error = "Username has been occupied";
                        }
                    })
                    .error(function () {

                    })
            }
        }
    }

})();