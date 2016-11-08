(function () {

  'use strict';

  angular
    .module('todoApp')
    .controller('UsersCtrl', UsersCtrl);

  UsersCtrl.$inject = ['usersStorageService', 'users', 'currentUser'];

  function UsersCtrl(userStorageService, users, currentUser) {
    var vm = this;

    vm.$onInit = init;
    vm.select = select;

    function init() {
      vm.users = users;
      vm.currentUser = currentUser;
    }

    function select(user) {
      userStorageService.setCurrentUser(user);
      vm.currentUser = user;
    }
  }

})();
