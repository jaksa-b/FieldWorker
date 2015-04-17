'use strict';

/**
 * @ngdoc overview
 * @name fieldworkerApp
 * @description
 * # fieldworkerApp
 *
 * Main module of the application.
 */
angular.module('fieldworkerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngRoute',
    'firebase',
    'toaster',
    'angularMoment'
  ])
  .constant('FURL', 'https://fieldworker0.firebaseio.com/')
  .run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (event, next, previous, error) {
      if(error === 'AUTH_REQUIRED'){
        $location.path('/login');
      }
    });
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl'
      })
      .when('/posts', {
        templateUrl: 'views/posts.html',
        controller: 'PostCtrl',
        resolve: {
          currentAuth: function (Auth) {
            return Auth.requireAuth();
          }
        }
      })
      .when('/posts/:postId', {
        templateUrl: 'views/post.html',
        controller: 'PostCtrl',
        resolve: {
          currentAuth: function (Auth) {
            return Auth.requireAuth();
          }
        }
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UserCtrl',
        resolve: {
          currentAuth: function (Auth) {
            return Auth.requireAuth();
          }
        }
      })
      .when('/users/:userId', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        resolve: {
          currentAuth: function (Auth) {
            return Auth.requireAuth();
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
