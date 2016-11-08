(function () {
  'use strict';

  angular
    .module('todoApp.ui')
    .component('todoControls', {
      templateUrl: './components/todo/controls/todo-controls.template.html',
      controllerAs: 'vm',
      require: {
        parent: '^todoList'
      }
    });

})();
