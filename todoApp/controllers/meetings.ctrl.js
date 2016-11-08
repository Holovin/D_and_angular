(function () {

  'use strict';

  angular
    .module('todoApp')
    .controller('MeetingsCtrl', MeetingsCtrl);

  MeetingsCtrl.$inject = ['owner', 'meetings'];

  function MeetingsCtrl(owner, meetings) {
    var vm = this;

    vm.$onInit = init;

    function init() {
      vm.owner = owner;
      vm.meetings = meetings;
    }
  }

})();
