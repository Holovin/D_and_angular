(function () {
  'use strict';

  angular
    .module('todoApp')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['networkService'];

  function MainCtrl(networkService) {
    var vm = this;
    var baseUrl = 'data/users.json';

    function getUsers(url) {
      return networkService.getData(url).then(function (res) {
        if (!res.users) {
          throw new Error('Wrong users file!');
        }

        vm.user = res.users[Math.floor(Math.random() * res.users.length)];
        return vm.user.url;
      });
    }

    function getUserList(url) {
      return networkService.getData(url).then(function (res) {
        if (!res.todoList) {
          throw new Error('Wrong user todo file!');
        }

        vm.list = res.todoList;
        return res.meetingsUrl;
      });
    }

    function getUserMeet(url) {
      return networkService.getData(url).then(function (res) {
        if (!res.meetings) {
          throw new Error('Wrong user meet file!');
        }

        return res;
      });
    }

    getUsers(baseUrl)
      .then(function (res) {
        return getUserList(res);
      })
      .then(function (res) {
        return getUserMeet(res)
      })
      .then(function (res) {
        // TODO: do something with meetings
        //console.log(res);
      })
      .catch(function a(err) {
        console.log("Fatality error (promise win): ", err);
    })
  }

})();