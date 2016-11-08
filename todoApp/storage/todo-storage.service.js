(function () {
  'use strict';

  angular
    .module('storage')
    .factory('todoStorageService', TodoStorageService);

  TodoStorageService.$inject = ['networkService', 'localStorageService', '$q'];

  function TodoStorageService(networkService, localStorageService, $q) {
    var _owner = [];
    var _todo = [];
    var _lsExist = false;

    return {
      getTodo: getTodo,
      setTodo: setTodo,

      setOwner: setOwner,
      getOwner: getOwner,

      addItem: addItem,
      addEmptyItem: addEmptyItem,
      removeItem: removeItem,

      loadLS: loadLS,
      checkLS: checkLS,
      clearLS: clearLS,
      saveLS: saveLS,
      loadTodo: loadTodo
    };

    function getTodo() {
      return _todo;
    }

    function setTodo(data) {
      _todo = data;
    }

    function setOwner(user) {
      if (!angular.equals(_owner, user)) {
        _owner = user;
        _todo = [];
        _lsExist = false;
      }
    }

    function getOwner() {
      return _owner;
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

    function loadTodo(owner) {
      if (angular.equals(_owner, owner) && _todo.length) {
        var defer = $q.defer();

        defer.resolve(_todo);

        return defer.promise;
      }

      _owner = owner;

      return  _getUserList(owner.todo)
        .then(function (res) {
          _todo = res.todoList;
          return _todo;
        })

        .catch(function (err) {
          console.log("Fatality error (promise win): ", err);
        })
    }

    function _getUserList(url) {
      return networkService.getData(url).then(function (res) {
        if (!res.todoList) {
          throw new Error('Wrong user todo file!');
        }

        return res;
      });
    }

    function loadLS() {
      var newTodo = localStorageService.getData(_owner.name);

      if (angular.equals({}, newTodo)) {
        _todo = [];
      } else {
        _todo = newTodo;
      }
    }

    function saveLS() {
      localStorageService.setData(_owner.name, _todo);

      _lsExist = true;
    }

    function checkLS() {
      return _lsExist;
    }

    function clearLS() {
      localStorageService.removeItem(_owner.name);
    }

    function _checkLS() {
      var newTodo = localStorageService.getData(_owner.name);
      return !angular.equals({}, newTodo);
    }
  }

})();
