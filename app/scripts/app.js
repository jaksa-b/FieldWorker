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
  .constant('FIREBASE_URL', 'https://fieldworker0.firebaseio.com/');
