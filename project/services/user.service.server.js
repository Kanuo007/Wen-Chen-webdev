/**
 * Created by wenchen on 11/1/16.
 */

module.exports = function(app,model) {
    var cookieParser = require('cookie-parser');
    var session      = require('express-session');
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require("bcrypt-nodejs");

    // config the raw session
    app.use(session({
        secret: "this is a secret",
        // secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true
    }));

    app.use(cookieParser());
    app.use(passport.initialize());
    // config the passport session
    app.use(passport.session());
    passport.use(new LocalStrategy(localStrategy));
    // tell passport, which fucntion do serializeUser ad deserializeUser
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    // local is local strategy name here
    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.post('/api/checkLogin', checkLogin);
    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);



    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }


    function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    // localStrategy should be before login called, it intercept the request
    // done is part of passport API, means we have find the user you can go next
    function localStrategy(username, password, done) {
        model.
            userModel
            .findUserByUserName(username)
            // .findUserByCredentials(username, password)
            .then(
                function(user) {
                   if (user && bcrypt.compareSync(password, user.password)) {
                       return done(null, user);
                    } else {
                       return done(null, '0');
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    // when we call the login, we have used local strategy the check the usename and password in
    // the database, here request include user.
    function login(req, res) {
        var user = req.user;
        res.json(user);
    }


    // what we want to put int the cookie, how the decode the user

    // user has login, what information is stored in cookie
    function serializeUser(user, done) {
        done(null, user);
    }



    function deserializeUser(user, done) {
        model
            .userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }



    function createUser(req, res){
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        model
            .userModel
            .createUser(user)
            .then(
                function(newUser) {
                    if(newUser){
                        req.login(newUser, function(err) {
                            if(err) {
                                res.sendStatus(400).send(err);
                            } else {
                                res.json(newUser);
                            }
                        });
                    }
                }
            );
    }

    function findUser(req, res){
        var query = req.query;
        if(query.password && query.username){
            findUserByCredentials(req,res);
        } else if (query.username){
            findUserByUserName(req,res);
        }
    }

    function findUserByUserName(req, res){
        var username = req.query.username;
        model
            .userModel
            .findUserByUserName(username)
            .then(
                function (user) {
                    if (user) {
                        if(user) {
                            res.json(user);
                        } else {
                            res.send('0');
                        }
                    } else {
                        console.log("not found");
                        res.send('0')
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function findUserByCredentials(req, res){
        var username = req.query.username;
        var password = req.query.password;
        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function (users) {
                    if (users) {
                        if (users[0]) {
                            res.json(users[0]);
                        } else{
                            res.send('0')
                        }
                    } else {
                        res.send('0')
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )

    }


    function findUserById(req, res){
        var userId = req.params.uid;
        model.userModel.findUserById(userId)
            .then(
                function (user) {
                    if (user) {
                        res.send(user);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function updateUser(req, res){
        console.log("hit the updateUser in server service");
        var user = req.body;
        var uid = req.params.uid;
       model
           .userModel
           .updateUser(uid, user)
           .then(
               function(status){
                   console.log("success to update");
                   res.sendStatus(200);
               },
               function(error) {
                   res.sendStatus(400).send(error);
               }
           )
    }

    function deleteUser(req,res){
        var uid = req.params.uid;
        model
            .userModel
            .deleteUser(uid)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function(error){
                  res.sendStatus(400).send(error);
                }
            )
    }

};

















