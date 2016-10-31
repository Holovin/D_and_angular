(function () {

  angular
    .module('todoApp')
    .component('todoFooter', {
      templateUrl: './todo/footer/todo-footer.template.html',
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