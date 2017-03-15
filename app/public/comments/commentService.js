(function() {
  'use strict';

  angular
    .module('app')
    .service('commentService', service);

  function service() {
    this.getComments = function(post) {
      // $http.get(`/api/posts/${post.id}`).then(function(response) {
        // console.log(response);
      // })
    // }
    console.log('commentService');
    }
  }

}());
