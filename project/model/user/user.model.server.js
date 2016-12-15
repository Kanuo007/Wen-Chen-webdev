/**
 * Created by wenchen on 11/14/16.
 */

module.exports = function() {
    var mongoose = require('mongoose');
    var UserSchema = require("./user.schema.server")();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUserName: findUserByUserName,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function createUser(user){
        user.VIP = false;
        user.playList =[];
        user.LikeArtists =[];
        user.LikeAlbums =[];
        return UserModel.create(user);
    }


    function findUserById(userId){
        // UserModel.find({_id: userId}) --> returns an array
        return UserModel.findById(userId);
    }

    function findUserByUserName(userName){
        return UserModel.findOne({
            username : userName
        });
    }

    function updateUser(userId, user){
        console.log(user);
        return UserModel
            .update(
                {
                    _id: userId
                },
                {
                    username : user.username,
                    password : user.password,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    email : user.email,
                    phone : user.phone,
                    VIP: user.VIP,
                    LikeArtists : user.LikeArtists,
                    LikeAlbums : user.LikeAlbums,
                    PlayList : user.PlayList,
                    dateCreated : new Date()
                }
            );
    }


    function findUserByCredentials(username, password){
       return UserModel.findOne({ // if you are sure there is only one element return, you could user findOne
            username: username,
            password: password
        });
    }



    function deleteUser (userId) {
        return UserModel
            .remove({_id: userId});

    }
};