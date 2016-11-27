/**
 * Created by wenchen on 10/9/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password){
            // var promise = UserService.findUserByCredentials(username, password);
            if (typeof(username) === "undefined" || username === "") {
                vm.error = "UserName is required."
            } else if (typeof(password) === "undefined" || password === "") {
                vm.error = "Password is required."
            } else {
                var promise = UserService.login(username, password);
                promise
                    .success(function (user) {
                        if (user === '0') {
                            vm.error = "No such user or invalid password";
                        } else {
                            $location.url("/user/" + user._id);
                        }
                    })
                    .error(function () {
                        vm.error = "400 error"
                    })
            }
        }
    }

})();