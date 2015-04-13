'use strict';

/**
 * @ngdoc function
 * @name fieldworkerApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the fieldworkerApp
 */
angular.module('fieldworkerApp')
  .controller('UserCtrl', function ($scope, Auth, User, $routeParams) {

    $scope.users = User.all;
    $scope.user = Auth.user;

    if($routeParams.userId){
      var user = User.getUser($routeParams.userId).$asObject();
      setSelectedUser(user);
    }
    function setSelectedUser(user){
      $scope.selectedUser = user;

    }
    
  });
