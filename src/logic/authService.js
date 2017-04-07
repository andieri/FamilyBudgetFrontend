var authService = angular.module("authServiceModule", []);

authService.factory("$httpWithProtection", function ($http, authService) {
    var http = function (config) {
        config.headers = {};
        config.headers.Authorization = "Basic " + authService.getTokenId();
        return $http(config);
    };
    return http;
});

authService.factory("authService", function ($http, $q) {
    var token;
    var user;

    function login(userModel) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: 'http://localhost:8080/login',
            data: userModel
        }).then(function (result) {
            user = result.data;
            token = result.data.userId;
            deferred.resolve({tokenId: result.data.userId});
        }, function (reason) {
            deferred.reject(createServerErrorObject(reason));
        });

        return deferred.promise;
    };

    function getUser(){
        return user;
    }
    function getTokenId(){
        return token;
    };

    function isLoggedIn(tokenId){
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'http://localhost:8080/token/'+tokenId,
            headers: { "Authorization" : 'Bearer '+ token }
        }).then(
            function(result){
                deferred.resolve({isLoggedIn : true, data: result});
            },
            function(error){
                deferred.reject(error);
            }
        )

        return deferred.promise;
    };


    function logout() {
        var deferred = $q.defer();
        user = undefined;
        $http({
            method: 'POST',
            url: 'http://localhost:8080/logout',
            data: {"tokenId" : getTokenId()}
        }).then(function (result) {
            deferred.resolve(result);
            token = null;
        }, function (reason) {
            deferred.reject(createServerErrorObject(reason));
        });

        return deferred.promise;

    };

    function createServerErrorObject(error) {
        alert("Error was taken!");
        return {};
    }

    return {login: login, logout: logout, getTokenId: getTokenId, isLoggedIn : isLoggedIn, getUser: getUser};
});

