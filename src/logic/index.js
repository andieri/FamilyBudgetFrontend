'use strict';

var familyBudgetApp = angular.module ("FamilyBudget", ['authServiceModule', 'ui.router','FamilyBudget.record', 'FamilyBudget.user', 'FamilyBudget.charts'])

familyBudgetApp.run(['$rootScope','authService', '$state', '$stateParams', function($rootScope, authenticator, $state, $stateParams) {

    $rootScope.user;
    $rootScope.loggedIn = false;
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    // add previous state property
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
        $state.previous = fromState;
    });

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        if (!$rootScope.loggedIn){
            if(toState.name !== 'login'){
                event.preventDefault(); return $state.go('login');}
            return;
        }
    });
}]);