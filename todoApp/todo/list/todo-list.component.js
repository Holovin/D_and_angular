(function () {

  angular
    .module('todoApp')
    .component('todoList', {
      templateUrl: './todo/list/todo-list.template.html',
      controller: TodoListController,
      controllerAs: 'vm'
    });

  TodoListController.$inject =  ['networkService'];
  function TodoListController(networkService) {
    var vm = this;
    vm.init = init;
    vm.add = add;

    init();

    function add() {
      var item = {
        status: false,
        'name': ''
      };

      vm.list.push(item);
    }

    function init() {
      networkService.getData().then(function (res) {

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
