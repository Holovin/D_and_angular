(function () {
  'use strict';

  angular
    .module('storage')
    .factory('userStorageService', UserStorageService);

  UserStorageService.$inject = ['networkService'];

  function UserStorageService(networkService) {
    var _users = [];
    var _user;

    return {
      getUsers: getUsers,

      getCurrentUser: getCurrentUser,
      setCurrentUser: setCurrentUser,

      loadUsers: loadUsers
    };

    function getUsers() {
      return _users;
    }

    function getCurrentUser() {
      if (_user) {
        return _user;
      }

      return false;
    }

    function setCurrentUser(user) {
      _user = user;
    }

    function loadUsers() {
      if (_users.length) {
        return _users;
      }

      return _getUsers('./data/users.json')
        .then(function (res) {
          _users = res.users;
          return res.users;
        })

        .catch(function (err) {
          console.log("Fatality error (promise win): ", err);
        });
    }

    function _getUsers(url) {
      return networkService.getData(url).then(function (res) {
        if (!res.users) {
          throw new Error('Wrong users file!');
        }

        return res;
      });
    }
  }

})();
