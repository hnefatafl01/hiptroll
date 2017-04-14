(function() {
  'use strict';

  angular
    .module('app')
    .service('postService', service)
    .service('CommentService', commentService);

  function commentService($http) {

  }

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
      console.log(post);
      $http.delete(`/api/posts/${post.id}`, post)
    }

    this.plusVote = function(post) {
      $http.post(`/api/posts/${post.id}/votes`, post).then(function(response) {
        console.log(response);
      })
    }

    this.minusVote = function(post) {
      $http.delete(`/api/posts/${post.id}/votes`, post).then(function(response) {
        console.log(response);
      })
    }

    this.getComments = function(post) {
      // console.log(post);
      return $http.get(`/api/posts/${post.id}/comments`).then(function(response) {
        console.log(response.data);
        return response.data;
      })
    }
  }
}())
