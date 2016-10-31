(function () {
  angular
    .module('todoApp')
    .component('todoList', {
      template: '<pre>{{$ctrl.data}}</pre>',
      controller: function TodoListController() {
        this.data = data;
      }
    });

})();
