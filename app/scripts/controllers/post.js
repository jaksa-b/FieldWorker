'use strict';

/**
 * @ngdoc function
 * @name fieldworkerApp.controller:PostCtrl
 * @description
 * # PostCtrl
 * Controller of the fieldworkerApp
 */
angular.module('fieldworkerApp')
  .controller('PostCtrl', function ($scope, $location, $routeParams, toaster, Post, Auth) {

    $scope.posts = Post.all;
    $scope.signedIn = Auth.signedIn;

    $scope.user = Auth.user;

    $scope.createPost = function () {
      $scope.post.name = Auth.user.profile.name;
      $scope.post.poster = Auth.user.uid;

      Post.createPost($scope.post).then(function () {
        toaster.pop('success', 'Post created successfully.');
        $scope.post = {title: '', description: '', name: '', poster: ''};
      });
    };

    $scope.editPost = function (post) {
      post.editPost(post).then(function () {
        toaster.pop('success', 'Post is updated.');
      });
    };
  });
