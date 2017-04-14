(function() {
  'use strict';

  angular
    .module('app')
    .service('postService', service)

  function service($http) {
    this.getPosts = function(){
      return $http.get('/api/posts').then(function(response){
        return response.data;
      })
    }

    this.makePost = function (post) {
      $http.post(`/api/posts`, post).then(function(response){
        vm.post = response.data;
        return vm.post;
      })
    }

    this.removePost = function(post) {
      $http.delete(`/api/posts/${post.id}`, post)
        .then(function(response){
          return response.data;
        })
    }

    this.plusVote = function(post) {
      $http.post(`/api/posts/${post.id}/votes`, post)
        .then(function(response) {
          return response.data
        })
    }

    this.minusVote = function(post) {
      $http.delete(`/api/posts/${post.id}/votes`, post)
        .then(function(response) {
          return response.data;
      })
    }

    this.getComments = function(post) {
      return $http.get(`/api/posts/${post.id}/comments`)
        .then(function(response) {
          return response.data;
        })
    }

    this.addComment = function(comment) {
      return $http.post(`/api/posts/${comment.post_id}/comments`, comment)
        .then(function(response) {
          console.log(response.data);
        })
    }
  }
}())
