(function () {
  'use strict';

  angular
    .module('todoApp')
    .component('todoControls', {
      templateUrl: './todo/controls/todo-controls.template.html',
      controller: TodoFooterController,
      controllerAs: 'vm',
      require: {
        parent: '^todoList'
      }
    });

  function TodoFooterController() {
    var vm = this;
  }

})();
