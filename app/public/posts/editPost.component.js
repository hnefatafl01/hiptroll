(function() {
  'use strict';

  angular.module("app")
  .component("editPost", {
    controller: editController,
    templateUrl: '/posts/edit.html'
  })

  editController.$inject = ['$http','$stateParams','$state']

  function editController($http, $stateParams, $state, post) {
    const vm = this;

    vm.$onInit = function() {
      vm.filters = ['Votes', 'Date', 'Title'];
      vm.sortFilters = ['votes','date','title'];
      vm.show = true;
      vm.status = {
        isopen: false
      };

      $http.get(`/api/posts/${$stateParams.id}`).then(function(response){
        vm.editPost = response.data;
        console.log(vm.editPost);
        console.log(response.status);
      }, function(error,response) {
        console.log(response.error)
      })
    }

    vm.showNewPost = function() {
        vm.show = !vm.show;
    }

    vm.updatePost = function(event, post) {
      event.preventDefault();
      $http.patch(`/api/posts/${$stateParams.id}`, vm.editPost).then(function(response){
        vm.post = response.data;
        $state.go('posts');
        console.log(response.status);
      }, function(response, error) {
        console.log(response.error)
      })
    }
  }
}());
