'use strict';
angular.module("FamilyBudget.record", ['ui.router', 'authServiceModule', '720kb.datepicker'])
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
        $urlRouterProvider;
        $stateProvider
            .state('record', {
                url: "/record",
                data: {
                    loginRequired: true
                },
                views:{
                    '':{template: '<h1>Empty view</h1>'},
                    'list':{
                        templateUrl: 'logic/record/allrecord.html',
                        controller: 'ListCtrl'
                    },
                    'content' : {
                        templateUrl: 'logic/record/record.html',
                        controller: "RecordCtrl"
                    }
                }
            })
    }])
    .controller('ListCtrl', ['$scope', '$rootScope', 'ListService', function($scope, $rootScope, listService){
        $scope.records = [];

        $rootScope.$on("refreshList", function(){
            $scope.getAllRecordByUser();
        });

        $scope.getAllRecordByUser = function(){
            listService.getList($rootScope.user.userId).then(
                function(result){
                    $scope.records = result.data;
                },
            function(error){
                console.log("Error happened while the records comes!!!");
            });
            console.log($scope.records);
        }
        $scope.getAllRecordByUser();
    }])
    .factory("ListService", function($httpWithProtection, $q){
        var  serviceOnject={};

        serviceOnject.getList = function(userId){
            var deffered = $q.defer();
            var promise = $httpWithProtection({
                url: "http://localhost:8080/record/all/"+userId,
                method: "GET"
            });
            promise.then(
                function(result){
                    deffered.resolve(result);
                },
                function(error){
                    deffered.reject(error);
                }
            );
            return deffered.promise;
        }

        return serviceOnject;
    })
    .controller("RecordCtrl", ['$scope', 'recordService', '$rootScope', function ($scope, recordService, $rootScope) {
        $scope.record  = {type: '', date: '', price: '', userId: ''};

        console.log("user on record: ");
        console.log($rootScope.user);

        $scope.saveRecord = function(){
            $scope.record.userId = $rootScope.user.userId;
            recordService.saveRecord($scope.record).then(
                function(result){
                    console.log(result);
                    $rootScope.$emit("refreshList", {});
                },
                function(error){

                }
            );
        }
    }])
    .factory("recordService", function($httpWithProtection, $q){
        var serviceObject = {};
        serviceObject.getRecord = function(recordId){
            console.log("get record " + recordId);
        }
        serviceObject.saveRecord = function(record){
            console.log("save record ");
            console.log(record);

            var deffered = $q.defer();
            var promise = $httpWithProtection({
                url: "http://localhost:8080/record",
                method: "POST",
                data: record
            });

            promise.then(
                function(result) {
                    deffered.resolve(result);
                },
                function (error){
                    deffered.reject();
                }
            );

            return deffered.promise;
        }
        return serviceObject;
    });