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
    vm.$oninit = init;
    vm.hey = hey;
    vm.add = add;

    init();

    function add() {
      var item = {
        'name': Math.random() % 10
      };

      vm.list.push(item);
    }

    function init() {
      networkService.getData().then(function (res) {

        if (!res['todoList']) {
          throw new Error('Empty file!');
        }

        console.log(vm.list);
        vm.list = res['todoList'];

        for (var i = 0; i < 2; i++) {
          vm.list[i].name += Math.random() % 10;
        }

      }).catch(function (err) {
        console.log(err);
      });
    }


    function hey() {
      console.log(vm.list);
    }

  }

})();

