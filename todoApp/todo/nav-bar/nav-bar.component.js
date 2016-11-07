(function () {
  'use strict';

  angular
    .module('todoApp.ui')
    .component('navBar', {
      templateUrl: './todo/nav-bar/nav-bar.template.html',
      controllerAs: 'vm',
      controller: NavBarController
    });

  function NavBarController() {
    var vm = this;

    vm.$onInit = init;

    function init() {
      vm.links = [{
        name: 'Users',
        state: 'app.users'
      }, {
        name: 'Todo',
        state: 'app.todo'
      }, {
        name: 'Meets',
        state: 'app.meets'
      }];
    }
  }

})();
