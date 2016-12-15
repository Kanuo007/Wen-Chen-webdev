

(function() {
    angular
        .module("MusesApp")
        .controller("HomePageController", HomePageController);

    function HomePageController($http, $location, $routeParams, UserService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.goToAccount = goToAccount;
        vm.goToSearch = goToSearch;
        vm.logout = logout;


        function goToAccount(){
            $location.url("/user/" + vm.uid);
        }

        function logout() {
            var promise = UserService.logout();
            promise
                .success(function(){
                    $location.url("/login");
                });
        }

        function goToSearch(searchKey){
            $location.url("/user/" + vm.uid + "/search/" + searchKey);
        }
    }

})();