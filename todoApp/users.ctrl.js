(function () {

  'use strict';

  angular
    .module('todoApp')
    .controller('UsersCtrl', Users);

  Users.$inject = ['userStorageService', 'users', 'currentUser'];

  function Users(userStorageService, users, currentUser) {
    var vm = this;

    vm.$onInit = init;
    vm.select = select;

    function init() {
      vm.users = users;
      vm.currentUser = currentUser;

      if (!vm.currentUser) {
        vm.currentUser = vm.users[0];
      }
    }

    function select(user) {
      userStorageService.setCurrentUser(user);
      vm.currentUser = user;
    }
  }

})();
