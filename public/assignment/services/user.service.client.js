/**
 * Created by wenchen on 10/9/16.
 */

/* have a place to centralize the data and make data shared anywhere if needed*/
/* factory function declear the service and allows others to use service when called*/
(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];
        var api = {
            createUser   : createUser,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUser : deleteUser
    };
        return api;
        function createUser(user) {
            users.push(user);
            console.log(users);
        }

        function findUserByCredentials(username,password){
            for (var u in users) {
                user = users[u];
                if (user.username === username && user.password === password) {
                    return  user;
                }
            }
            return null;
        }


        function findUserById(id) {
            for(var u in users){
                user = users[u];
                if(user._id === id){
                    return user;
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            var result = [];
            for(var u in users){
                if(users[u].username === username){
                    result.push(users[u]);
                }
            }
            return result;
        }

        function updateUser(userId, user) {
            for(var u in users){
                if(users[u]._id === userId){
                    users[u] = user
                }
            }

        }


        function deleteUser(userId) {
            for(var w in users){
                if(users[w]._id = userId){
                    users.splice(w, 1);
                }
            }
        }

    }
})();




