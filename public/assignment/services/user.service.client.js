/**
 * Created by wenchen on 10/9/16.
 */

/* have a place to centralize the data and make data shared anywhere if needed*/
/* factory function declear the service and allows others to use service when called*/
(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            createUser   : createUser,
            findUserById : findUserById,
            findUserByUserName : findUserByUserName,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUser : deleteUser
        };
        return api;

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
            var url = "/api/user/" + user._id;
            return $http.put(url, user);
        }


        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }

    }
})();




