(function() {
  'use strict';

  angular
    .module('app')
    .service('CommentService', commentService);

  function commentService($http) {
    this.getComments = function(post) {
      // console.log(post);
      return $http.get(`/api/posts/${post.id}/comments`).then(function(response) {
        // console.log(response.data);
        return response.data;
      })
    }
  }

}());
