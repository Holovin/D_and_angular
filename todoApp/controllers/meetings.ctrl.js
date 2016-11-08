(function () {

  'use strict';

  angular
    .module('todoApp')
    .controller('MeetingsCtrl', MeetingsCtrl);

  MeetingsCtrl.$inject = ['meetings'];

  function MeetingsCtrl(meetings) {
    var vm = this;

    vm.$onInit = init;

    function init() {
      vm.meetings = meetings;
    }
  }

})();
