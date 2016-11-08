(function () {
  'use strict';

  angular
    .module('todoApp.ui')
    .component('users', {
      templateUrl: './components/users/users.template.html',
      controller: UsersController,
      controllerAs: 'vm',
      bindings: {
        users: '<',
        currentUser: '<',
        onSelect: '&'
      }
    });

  function UsersController() {
    var vm = this;

    vm.$onInit = init;
    vm.select = select;
    vm.isActive = isActive;

    function init() {

    }

    function select(user) {
      vm.onSelect({user: user});
    }

    function isActive(user) {
      return angular.equals(vm.currentUser, user);
    }
  }

})();
