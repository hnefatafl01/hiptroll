(function() {
  'use strict';

  angular.module("app")
  .component("comment", {
    controller: commentController,
    templateUrl: './comments/comment.html'
  })

  function commentController(commentService) {
    const vm = this;

    vm.$onInit = function(){
      vm.showComment = true;
    }

    vm.createComment = function(event, post) {
      event.preventDefault();
      vm.post = post;
      vm.post.comments.push({
        id: post.comments.length + 1,
        content: vm.comment.content,
        created_at: new Date(),
        post_id: post.id
      })
      console.log(vm.post.id.comment);


      $http.post(`/api/posts/${post.id}/comments`, vm.comment).then(function(response) {
        console.log(response);
        res.json(response.data);
      })
      vm.numComments = post.comments.length;
      post.comment = '';
      delete vm.comment;
    }

    vm.showComments = function(post) {
      post.showComment = !post.showComment;
      commentService.getComments(post);
    }
  }

}());
