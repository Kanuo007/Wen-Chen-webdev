/**
 * Created by wenchen on 10/9/16.
 */

/* have a place to centralize the data and make data shared anywhere if needed*/
/* factory function declear the service and allows others to use service when called*/
(function() {
    angular
        .module("MusesApp")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            createUser : createUser,
            findUserById : findUserById,
            findUserByUserName : findUserByUserName,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUser : deleteUser,
            login: login,
            checkLogin: checkLogin,
            logout: logout
        };
        return api;

        function logout() {
            return $http.post("/api/logout");
        }

        function checkLogin() {
            return $http.post("/api/checkLogin");
        }

        function login(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/login", user);
        }

        function createUser(username,password) {
            var user = {
                username:username,
                password:password
            };
            return $http.post('/api/user',user);
        }

        function findUserByCredentials(username,password){
            var url = '/api/user?username='+username+'&password='+password;
            return $http.get(url);
        }


        function findUserById(id) {
            var url = '/api/user/' + id;
            return $http.get(url);
        }

        function findUserByUserName(username) {
            var url = '/api/user?username='+username;
            return $http.get(url);
        }

        function updateUser(user) {
            // console.log("hit the updateUser before service");
            // console.log(user);
            // console.log(user._id)
            var url = "/api/user/" + user._id;
            return $http.put(url, user);
        }


        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }

    }
})();




