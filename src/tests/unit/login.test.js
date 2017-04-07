describe('Family Budget Application Login Unit test', function(){

    var scope,
        userController;

    beforeEach( function(){

        module('FamilyBudget.user');

    });

    beforeEach(
        inject(
            function($rootScope, $controller){
                scope = $rootScope.$new();
                userController = $controller;
                userController('UserCtrl', {'$scope': scope});
            }
        )
    );

    beforeEach(function () {
        var ptor = protractor.getInstance();
        ptor.get('https://app.vwo.com');
    });

    it('initially the user credentials are empty', function(){
        var emptyCredentials = {username: '', password:''};
        console.log('userController: ');
        console.log(scope);
        expect(scope.userCredential.username).toEqual(emptyCredentials.username);
        expect(scope.userCredential.password).toEqual(emptyCredentials.password);
    });

    it ("the dom can load the login page", function(){

        browser.get('http://localhost:8000/#/');
        expect(element(by.id('username')).getText()).toEqual('Hello, World!');

    });

});