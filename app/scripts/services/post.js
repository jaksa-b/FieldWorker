'use strict';

/**
 * @ngdoc service
 * @name fieldworkerApp.Post
 * @description
 * # Post
 * Factory in the fieldworkerApp.
 */
angular.module('fieldworkerApp')
  .factory('Post', function (FURL, $firebase, Auth) {

    var ref = new Firebase(FURL);
    var posts = $firebase(ref.child('posts')).$asArray();
    var user = Auth.user;

    var Post = {
      all: posts,
      getPost: function (postId) {
        return $firebase(ref.child('posts').child(postId));
      },
      createPost: function (post) {
        post.datetime = Firebase.ServerValue.TIMESTAMP;
        return posts.$add(post);
      },
      editPost: function (post) {
        var p = this.getPost(post.$id);
        return p.$update({title: post.title, description: post.description});
      },
      archivePost: function (postId) {
        var p = this.getPost(postId);
        return p.$update({status: 'closed'});
      },
      isCreator: function (post) {
        return (user && user.provider && user.uid === post.poster);
      },
      isOpen: function (post) {
        return post.status === 'open';
      }
    };
    return Post;
  });
