/**
 * Created by wenchen on 12/6/16.
 */
/**
 * Created by wenchen on 10/9/16.
 */
(function() {
    /* config functino will work as part of the angular with para you ask for, int route Provider */
    angular
        .module("MusesApp")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
        /* html template talk to controller by model*/

            .when("/login", {
                templateUrl: "../project/views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "../project/views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid/homePage", {
                templateUrl: "views/homePage/homePage.view.client.html",
                controller: "HomePageController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/user/:uid", {
                templateUrl: "../project/views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/user/:uid/search/:searchKey", {
                templateUrl: "views/searchResult/generalResult.view.client.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/user/:uid/artist/:artistId", {
                templateUrl: "views/searchResult/oneArtist.view.client.html",
                controller: "ArtistController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/user/:uid/album/:albumId", {
                templateUrl: "views/searchResult/oneAlbum.view.client.html",
                controller: "AlbumController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/user/:uid/favorite", {
                templateUrl: "views/user/favorite.view.client.html",
                controller: "FavoriteController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/user/:uid/playList", {
                templateUrl: "views/playList/playList.view.client.html",
                controller: "PlayListController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin,
                }
            })
            .when("/user/:uid/becomeVIP", {
                templateUrl: "views/user/becomeVIP.view.client.html",
                controller: "VIPController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin,
                }
            })
            .otherwise({
                redirectTo:"/login"
            });

        // use $q library
        // do not wait for me, keep doing
        function checkLogin($q, UserService ,$location) {
            var deferred = $q.defer();
            UserService
                .checkLogin()
                .success(
                    function (user) {
                        if (user != '0') {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                            $location.url("/login");
                        }
                    }
                );
            return deferred.promise;
        }


    }

})();