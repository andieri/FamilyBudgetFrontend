var chartModule = angular.module("FamilyBudget.charts", ['ui.router', 'authServiceModule'])
    .config(["$stateProvider", '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('charts',
                {
                    url: "/charts",
                    data: {
                        loginRequired: true
                    },
                    views: {
                        '': {template: '<div>Empty charts template</div>'},
                        'list': {template: '<div></div>'},
                        'content': {templateUrl: 'logic/charts/charts.html'}
                    },
                    controller: 'ChartCrtl'
                })
    }])
    .controller("ChartCtrl", ['$scope', function($scope, chartService){
        console.log('chart controller');
    }])
    .factory("chartService", function($httpWithProtection) {
    var serviceObject = {}

    serviceObject.getRecords = function () {
        console.log("get all record by logged in user");
    }

    return serviceObject;
});