(function () {
  'use strict';

  angular
    .module('storage')
    .factory('usersStorageService', UsersStorageService);

  UsersStorageService.$inject = ['networkService', '$q'];

  function UsersStorageService(networkService, $q) {
    var _users = [];
    var _currentUser;

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
      if (_currentUser) {
        return _currentUser;
      }

      return false;
    }

    function setCurrentUser(user) {
      _currentUser = user;
    }

    function loadUsers() {
      if (_users.length) {
        var defer = $q.defer();

        defer.resolve(_users);

        return defer.promise;
      }

      return _getUsers('./data/users.json')
        .then(function (res) {
          _users = res.users;
          _currentUser = res.users[0];
          return res.users;
        })

        .catch(function (err) {
          console.log("Fatality error (promise win): ", err);
        });
    }

    function _getUsers(url) {
      return networkService.getData(url).then(function (res) {
        if (!res.users || !res.users.length) {
          throw new Error('Wrong users file!');
        }

        return res;
      });
    }
  }

})();
