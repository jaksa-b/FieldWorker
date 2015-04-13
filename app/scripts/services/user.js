'use strict';

/**
 * @ngdoc service
 * @name fieldworkerApp.User
 * @description
 * # User
 * Factory in the fieldworkerApp.
 */
angular.module('fieldworkerApp')
  .factory('User', function (FURL, $firebase) {

    var ref = new Firebase(FURL);
    var users = $firebase(ref.child('users')).$asArray();

    var User = {
      all: users,
      getUser: function (userId) {
        return $firebase(ref.child('users').child(userId));
      }
    };
    return User;
  });