'use strict';

/**
 * @ngdoc function
 * @name fieldworkerApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the fieldworkerApp
 */
angular.module('fieldworkerApp')
  .controller('NavCtrl', function ($scope, $location, Auth, toaster) {
    $scope.currentUser = Auth.user;
    $scope.signedIn = Auth.signedIn;

    $scope.logout = function () {
      Auth.logout();

      toaster.pop('success', 'Logged Out Like A Boss!');
      //console.log('Logged Out!');
      $location.path('/');
    };

    $scope.changePassword = function (user) {
      Auth.changePassword(user).then(function () {

        // Reset Form
        $scope.user.email = '';
        $scope.user.oldPass = '';
        $scope.user.newPass = '';


        toaster.pop('success', 'Password Changed Successfully!');
        //console.log('Password Changed Successfully!');
      }, function (error) {
        toaster.pop('error', error.message);
        //console.log('Error:', error);
      });
    };
  });
