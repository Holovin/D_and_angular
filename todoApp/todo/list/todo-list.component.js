(function () {

  angular
    .module('todoApp')
    .component('todoList', {
      templateUrl: './todo/list/todo-list.template.html',
      controller: TodoListController,
      controllerAs: 'vm',
      bindings: {
        list: '='
      }
    });

  TodoListController.$inject =  ['localStorageService'];

  function TodoListController(localStorageService) {
    var vm = this;

    vm.add = add;
    vm.loadLS = loadLS;
    vm.saveLS = saveLS;
    vm.remove = removeRow;

    function add() {
      var item = {
        status: false,
        'name': ''
      };
      vm.list.push(item);

    }

    function removeRow(row) {
      var index = vm.list.indexOf(row);

      if (index >= 0) {
        vm.list.splice(index, 1);
      }
    }

    function loadLS() {
      vm.list = localStorageService.getData('todo');

      if (angular.equals({}, vm.list)) {
        vm.list = [];
      }
    }

    function saveLS() {
      localStorageService.setData('todo', vm.list);
    }
  }

})();
