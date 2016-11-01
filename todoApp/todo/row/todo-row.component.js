(function () {

  angular
    .module('todoApp')
    .component('todoListRow', {
      templateUrl: './todo/row/todo-row.template.html',
      controller: TodoRowController,
      controllerAs: 'vm',
      bindings: {
        row: '<',
        onRemove: '&'
      }
    });

  function TodoRowController() {
    var vm = this;

    vm.canEdit = false;
    vm.edit = edit;
    vm.remove = remove;

    function edit() {
      vm.canEdit = !vm.canEdit;
    }

    function remove() {
      vm.onRemove({
        row: vm.row
      })
    }

  }

})();
