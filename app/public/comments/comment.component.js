(function() {
  'use strict';

  angular.module("app")
  .component("comment", {
    controller: commentController,
    templateUrl: './comments/comment.html'
  })

  function commentController(postService) {
    const vm = this;

    vm.$onInit = function(){
      vm.showComment = true;

    }

    vm.createComment = function(event, post) {
      event.preventDefault();
      console.log(post);
      post.comments.push({
        id: post.comments.length + 1,
        content: comment.content,
        created_at: new Date(),
        post_id: post.id
      })


      vm.numComments = post.comments.length;
      post.comment = '';
      delete vm.comment;
    }

    vm.showComments = function(post) {
      post.showComment = !post.showComment;
      postService.getComments(post);
    }
  }

}());
