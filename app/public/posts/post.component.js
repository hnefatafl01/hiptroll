(function() {
  'use strict';

  angular.module("app")
  .component("post", {
    controller: controller,
    templateUrl: '/posts/post.html'
  })

  controller.$inject = ['postService','$stateParams', '$state']

  function controller(postService, $stateParams, $state) {
      const vm = this;

      vm.$onInit = function() {
        vm.filters = ['Votes', 'Date', 'Title'];
        vm.sortFilters = ['votes','date','title'];
        vm.show = false;
        vm.showComment = false;

        vm.status = {
          isopen: false
        };

        postService.getPosts().then(function(posts){
          vm.posts = posts;
        })
      }

      vm.showNewPost = function() {
          vm.show = !vm.show;
      }

      vm.createPost = function(event,post) {
        event.preventDefault();
        if(vm.newPost && vm.newPost.title && vm.newPost.body && vm.newPost.author && vm.newPost.imageUrl) {
          vm.newPost = {
            title: vm.newPost.title,
            body: vm.newPost.body,
            image_url: vm.newPost.imageUrl,
            author: vm.newPost.author,
            comments: [],
            vote_count: 0,
            created_at: new Date()
          }

          vm.post = vm.newPost;
          let post = vm.post;
          postService.makePost(post).then(function(post) {
            vm.post = post;
            return vm.post;
          })

          delete vm.post;
          vm.postForm.$setUntouched();
          vm.postForm.$setPristine();
          }
          vm.showNewPost()
          $state.go($state.current, {}, {reload: true});
      }


      vm.deletePost = function(post) {
        vm.post = post;
        postService.removePost(vm.post);
        // vm.$onInit();
        $state.go($state.current, {}, {reload: true});
      }

      vm.addVote = function(post) {
        vm.post = post;
        postService.plusVote(vm.post)
        // vm.$onInit();
        $state.go($state.current, {}, {reload: true});
      }

      vm.subtractVote = function(post) {
        vm.post = post;
        if(post.vote_count > 0) {
          postService.minusVote(vm.post)
        } else {
          return post.vote_count = 0;
        }
        // vm.$onInit();
        $state.go($state.current, {}, {reload: true});
      }

      vm.toggled = function(open) {
        $log.log('Dropdown is now: ', open);
      };

      vm.toggleDropdown = function() {
        vm.status.isOpen = !vm.status.isOpen
      }

      vm.selectFilter = function(filter) {
        vm.filterBy = filter;
        if(vm.filterBy == 'Date') {
          vm.sortFilter = '-create_at';
        } else if(vm.filterBy == 'Votes') {
          vm.sortFilter = '-vote_count';
        } else if (vm.filterBy == 'Title'){
          vm.sortFilter = 'title'
        } else {
          vm.sortFilter;
        }
      }

// comments
    vm.createComment = function(event, post, $index) {
      event.preventDefault();

      vm.comment = {
        content: post.comment.content,
        post_id: post.id
      }

      postService.addComment(vm.comment);
      vm.numComments = post.comments.length;
      delete vm.comment;
      $state.go($state.current, {}, {reload: true});
    }

    vm.showComments = function(post) {
      post.showComment = !post.showComment;
      // postService.getComments(post);
    }

  }
}());
