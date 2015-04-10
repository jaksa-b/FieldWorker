'use strict';

/**
 * @ngdoc function
 * @name fieldworkerApp.controller:PostsCtrl
 * @description
 * # PostsCtrl
 * Controller of the fieldworkerApp
 */
angular.module('fieldworkerApp')
  .controller('PostsCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
