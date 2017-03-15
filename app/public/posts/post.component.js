(function() {
  'use strict';

  angular.module("app")
  .component("post", {
    controller: controller,
    templateUrl: '/posts/post.html'
  })

  controller.$inject = ['postService','$stateParams']

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

        postService.makePost(vm.post).then(function(post) {
          vm.post = post;
        })
        vm.$onInit();
        delete vm.post;
        vm.postForm.$setUntouched();
        vm.postForm.$setPristine();
        }
        vm.showNewPost()

    }


    vm.deletePost = function(post) {
      vm.post = post;
      postService.removePost(vm.post);
      vm.$onInit();
    }

    vm.addVote = function(post) {
      vm.post = post;
      postService.plusVote(vm.post)
      vm.$onInit();
    }

    vm.subtractVote = function(post) {
      vm.post = post;
      if(post.vote_count > 0) {
        postService.minusVote(vm.post)
      } else {
        return post.vote_count = 0;
      }
      vm.$onInit();
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
  }
}());
