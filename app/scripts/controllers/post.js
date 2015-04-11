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

    $scope.searchPost = '';
    $scope.posts = Post.all;
    $scope.signedIn = Auth.signedIn;

    $scope.user = Auth.user;

    if($routeParams.postId){
      var post = Post.getPost($routeParams.postId).$asObject();
      setSelectedPost(post);
    }
    function setSelectedPost(post){
      $scope.selectedPost = post;

      if($scope.signedIn()){
        $scope.isPostCreator = Post.isCreator;
        $scope.isOpen = Post.isOpen;
      }
    }
    $scope.archivePost = function (postId) {
      Post.archivePost(postId).then(function () {
        toaster.pop('success', 'This post was archived successfully.');
      });
    };

    $scope.createPost = function () {
      $scope.post.status = 'open';
      $scope.post.name = Auth.user.profile.name;
      $scope.post.poster = Auth.user.uid;

      Post.createPost($scope.post).then(function () {
        toaster.pop('success', 'Post created successfully.');
        $scope.post = {title: '', description: '', status: 'open', name: '', poster: ''};
      });
    };

    $scope.editPost = function (post) {
      Post.editPost(post).then(function () {
        toaster.pop('success', 'Post is updated.');
      });
    };
  });
