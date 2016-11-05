/**
 * Created by wenchen on 11/1/16.
 */

module.exports = function(app) {

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);

    // there are two types of parameters:
    // One is path params; eg : /123
    // the other is query params eg: ?username = xxx;

    function createUser(req, res){
        var user = req.body;
        user._id = (new Date()).getTime().toString();
        users.push(user);
        res.send(user);
    }

    function findUser(req, res){
        var query = req.query;
        if(query.password && query.username){
            findUserByCredentials(req,res);
        } else if (query.username){
            findUserByUsername(req,res);
        }
    }

    function findUserByUsername(req, res){
        var username = req.query.username;
        for(var u in users) {
            if (users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    function findUserByCredentials(req, res){
        var username = req.query.username;
        var password = req.query.password;
        for(var u in users) {
            if (users[u].username === username &&
                users[u].password === password) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }


    function findUserById(req, res){
        var userId = req.params.uid;
        for(var u in users) {
            if(parseInt(users[u]._id) === parseInt(userId)){
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    function updateUser(req, res){
        var user = req.body;
        var uid = req.params.uid;
        for(var u in users) {
            if (users[u]._id === uid){
                users[u] = user;
                break;
            }
        }
        res.sendStatus(200);
    }

    function deleteUser(req,res){
        var uid = req.params.uid;
        for(var u in users) {
            if (users[u]._id === uid) {
                users.splice(u, 1);
            }
        }
        res.sendStatus(200);
    }


};

















