'use strict';

/**
 * @ngdoc function
 * @name fieldworkerApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the fieldworkerApp
 */
angular.module('fieldworkerApp')
  .controller('AuthCtrl', function ($scope, $location, Auth, toaster) {

    if(Auth.signedIn()){
      $location.path('/');
    }

    $scope.register = function (user) {
      Auth.register(user).then(function () {
        toaster.pop('success', 'Registration Successfully!');
        //console.log("Registration Successfully!");
        $location.path('/');
      }, function (error) {
        toaster.pop('error', error.message);
        //console.log('Error:', error);
      });
    };

    $scope.login = function (user) {
      Auth.login(user).then(function () {
        toaster.pop('success', 'LoggedIn Successfully!');
        //console.log('Login Success');
        $location.path('/');
      }, function (error) {
        toaster.pop('error', error.message);
        //console.log('Error:', error);
      });
    };
  });
