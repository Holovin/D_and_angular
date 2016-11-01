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

    vm.$onInit = init;
    vm.edit = edit;
    vm.remove = remove;

    function init() {
      vm.name = vm.row.name;
      vm.canEdit = false;
    }

    function edit() {
      if (vm.canEdit) {
        vm.row.name = vm.name;
      }

      vm.canEdit = !vm.canEdit;
    }

    function remove() {
      vm.onRemove({
        row: vm.row
      })
    }
  }

})();
