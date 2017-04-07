'user strict';

angular.module("FamilyBudget.user", ['ui.router', 'authServiceModule'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state(
            'login',{
                url: "/",
                data: {
                    loginRequired: true
                },
                views: {
                    '' : {template: '<div>Empty template</div>'},
                    'list': {template: '<div></div>' },
                    'content' : {templateUrl: 'logic/user/login.html',
                        controller: 'UserCtrl'}
                }
            }
        )
        .state(
            'logout', {
                url: '/logout',
                data: {
                    loginRequired: true
                },
                views: {
                    '' : {template: '<div>Empty template</div>'},
                    'list': {template: '<div></div>'},
                    'content': {templateUrl: 'logic/user/login.html',
                    controller: "UserCtrl"}
                }
            }
        )
}])
    .controller('UserCtrl', ['$rootScope', '$scope','authService', '$state',  function($rootScope, $scope, authenticator, $state){
        $scope.userCredential = {username : '', password : ''}

        $scope.login = function() {
            var user = authenticator.login($scope.userCredential);
            user.then(function (response) {
                    $rootScope.loggedIn = true;
                    $rootScope.user = authenticator.getUser();
                    $state.go("record");
                },
                function (error) {
                    alert("Wrong username or password!");
                });
        }

        $scope.logout = function(){
            authenticator.logout();
            $rootScope.loggedIn = false;
            $rootScope.user = undefined;
        }

    }]);
