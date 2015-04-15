'use strict';

/**
 * @ngdoc function
 * @name fieldworkerApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the fieldworkerApp
 */
angular.module('fieldworkerApp')
  .controller('UserCtrl', function ($scope, User, $routeParams, toaster, Auth) {

    $scope.users = User.all;
    $scope.user = Auth.user;
    $scope.userPosts = [];


    if($routeParams.userId){
      var user = User.getUser($routeParams.userId).$asObject();
      setSelectedUser(user);
    }
    function setSelectedUser(user){
      $scope.selectedUser = user;

      User.getUserPosts(user.$id).then(function (posts) {

        for(var i = 0; i < posts.length; i++){
          $scope.userPosts.push(posts[i]);
        }
        $scope.numPoster = $scope.userPosts.length;
      });
    }
    $scope.editUser = function (user) {
      User.editUser(user).then(function () {
        toaster.pop('success', 'Profile Updated');
      });
    };

    $scope.archiveUser = function (userId) {
      User.archiveUser(userId).then(function () {
        toaster.pop('success', 'User Archived');
      });
    };

  });
