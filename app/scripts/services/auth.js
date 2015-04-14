'use strict';

/**
 * @ngdoc service
 * @name fieldworkerApp.Auth
 * @description
 * # Auth
 * Factory in the fieldworkerApp.
 */
angular.module('fieldworkerApp')
  .factory('Auth', function (FURL, $firebaseAuth, $firebase) {
    var ref = new Firebase(FURL);
    var auth = $firebaseAuth(ref);

    var Auth = {

      user:{},

      createProfile: function (uid, user) {
        var profile = {
          name: user.name,
          email: user.email,
          active: true
        };
        var profileRef = $firebase(ref.child('users'));
        return profileRef.$set(uid, profile);
      },

      login: function(user){
        return auth.$authWithPassword(
          {email: user.email, password: user.password}
        );
      },
      register: function (user) {
        return auth.$createUser(
          {email: user.email, password: user.password})
          .then(function () {
            return Auth.login(user);
          })
          .then(function (data) {
            return Auth.createProfile(data.uid, user);
          });
      },
      logout: function () {
        auth.$unauth();
      },
      changePassword: function (user) {
        return auth.$changePassword(
          {email: user.email, oldPassword: user.oldPass, newPassword: user.newPass}
        );
      },
      signedIn: function () {
        return !!Auth.user.provider;
      }
    };
    auth.$onAuth(function (authData) {
      if(authData){
        angular.copy(authData, Auth.user);
        Auth.user.profile = $firebase(ref.child('users').child(authData.uid)).$asObject();
      } else {
        if(Auth.user && Auth.user.profile){
          Auth.user.profile.$destroy();
        }
        angular.copy({}, Auth.user);
      }
    });

    return Auth;
  });
