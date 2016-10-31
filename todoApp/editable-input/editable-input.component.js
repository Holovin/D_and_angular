(function () {

  angular
    .module('todoApp')
    .component('editableInput', {
      templateUrl: './editable-input/editable-input.template.html',
      controller: EditableInputController,
      controllerAs: 'vm',
      bindings: {
        value: '=',
        onUpdate: '&'
      }
    });

  function EditableInputController() {
    var vm = this;

    vm.$onInit = init;
    vm.canEdit = false;
    vm.changeCanEdit = changeCanEdit;


    function changeCanEdit() {
      if (vm.canEdit) {
        vm.onUpdate({
          value: vm.value
        });
      }

      vm.canEdit = !vm.canEdit;
    }

    function init() {
      console.log(this);
    }

  }

})();


