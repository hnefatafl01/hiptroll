(function() {
  'use strict';

  angular
    .module('app')
    .service('commentService', service);

  function service() {

    this.getComments = function(post) {
      console.log('hi');
      console.log(post);
      return $http.get(`/api/posts/${post.id}`).then(function(response) {
        console.log(response);
        return response;
      })
    }
  }

}());
