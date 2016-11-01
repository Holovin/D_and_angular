(function () {

  angular
    .module('todoApp')
    .component('todoList', {
      templateUrl: './todo/list/todo-list.template.html',
      controller: TodoListController,
      controllerAs: 'vm'
    });

  TodoListController.$inject =  ['networkService', 'localStorageService'];

  function TodoListController(networkService, localStorageService) {
    var vm = this;

    vm.init = init;
    vm.add = add;
    vm.loadLS = loadLS;
    vm.saveLS = saveLS;
    vm.remove = removeRow;
    init();


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

    function init() {
      networkService.getData('data/data.json').then(function (res) {

        if (!res['todoList']) {
          throw new Error('Empty file!');
        }

        vm.list = res['todoList'];

      }).catch(function (err) {
        console.log(err);
      });
    }
  }

})();
