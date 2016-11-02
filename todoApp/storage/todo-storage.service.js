(function () {
  'use strict';

  angular
    .module('storage')
    .factory('todoStorageService', TodoStorageService);

  TodoStorageService.$inject = ['localStorageService', 'networkService'];

  function TodoStorageService(localStorageService, networkService) {
    var _todo = [];
    var _user = [];

    return {
      getUser: getUser,
      getData: getData,
      setData: setData,

      addItem: addItem,
      addEmptyItem: addEmptyItem,
      removeItem: removeItem,

      loadHttp: loadHttp,
      loadLS: loadLS,
      saveLS: saveLS
    };

    function getUser() {
      return _user;
    }

    function getData() {
      return _todo;
    }

    function setData(data) {
      this.todo = data;
    }
    
    function addItem(item) {
      _todo.push(item);
    }

    function addEmptyItem() {
      var item = {
        name: '',
        status: false
      };

      _todo.push(item);
    }
    
    function removeItem(item) {
      var index = _todo.indexOf(item);

      if (index >= 0) {
        _todo.splice(index, 1);
      }
    }

    function loadHttp() {
      return _getUsers('data/users.json')
        .then(function (res) {
          return _getUserList(res);
        })
        .then(function (res) {
          return _getUserMeet(res)
        })
        .then(function (res) {
          // TODO: do something with meetings
          //console.log(res);
        })
        .catch(function a(err) {
          console.log("Fatality error (promise win): ", err);
        })
    }

    function loadLS() {
      var newTodo = localStorageService.getData('todo');

      if (angular.equals({}, newTodo)) {
        _todo = [];
      } else {
        _todo = newTodo;
      }

    }

    function saveLS() {
      localStorageService.setData('todo', _todo);
    }

    function _getUsers(url) {
      return networkService.getData(url).then(function (res) {
        if (!res.users) {
          throw new Error('Wrong users file!');
        }

        _user = res.users[_.random(res.users.length - 1)];
        return _user.url;
      });
    }

    function _getUserList(url) {
      return networkService.getData(url).then(function (res) {
        if (!res.todoList) {
          throw new Error('Wrong user todo file!');
        }

        _todo = res.todoList;
        return res.meetingsUrl;
      });
    }

    function _getUserMeet(url) {
      return networkService.getData(url).then(function (res) {
        if (!res.meetings) {
          throw new Error('Wrong user meet file!');
        }

        return res;
      });
    }
  }

})();
