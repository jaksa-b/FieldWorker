'use strict';

/**
 * @ngdoc service
 * @name fieldworkerApp.User
 * @description
 * # User
 * Factory in the fieldworkerApp.
 */
angular.module('fieldworkerApp')
  .factory('User', function (FURL, $firebase, $q, Auth) {

    var ref = new Firebase(FURL);
    var users = $firebase(ref.child('users')).$asArray();
    var user = Auth.user;

    var User = {
      all: users,
      getUser: function (userId) {
        return $firebase(ref.child('users').child(userId));
      },
      editUser: function (user) {
        var u = this.getUser(user.$id);
        return u.$update({name:user.name, email:user.email});
      },
      archiveUser: function (userId) {
        var u = this.getUser(userId);
        return u.$update({active: false});
      },
      getUserPosts: function (uid) {
        var defer = $q.defer();

        $firebase(ref.child('user_posts').child(uid)).$asArray().$loaded().then(function (posts) {
          defer.resolve(posts);
        }, function () {
          defer.reject();
        });

        return defer.promise;
      },
      isOwner: function (userId) {
        return (user && user.provider && user.uid === userId);
      }
    };
    return User;
  });
