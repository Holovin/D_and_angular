(function () {
  'use strict';

  angular
    .module('todoApp.ui')
    .component('navBar', {
      templateUrl: './components/nav-bar/nav-bar.template.html',
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
        name: 'Meetings',
        state: 'app.meetings'
      }];
    }
  }

})();
