(function () {
  'use strict';

  angular
    .module('storage')
    .factory('meetingsStorageService', MeetingsStorageService);

  MeetingsStorageService.$inject = ['networkService', '$q'];

  function MeetingsStorageService(networkService, $q) {
    var _meetings = [];
    var _owner;

    return {
      setOwner: setOwner,
      getOwner: getOwner,

      loadMeetings: loadMeetings
    };

    function setOwner(user) {
      if (!angular.equals(_owner, user)) {
        _owner = user;
        _meetings = [];
      }
    }

    function getOwner() {
      return _owner;
    }

    function loadMeetings(owner) {
      if (angular.equals(_owner, owner) && _meetings.length) {
        var defer = $q.defer();

        defer.resolve(_meetings);

        return defer.promise;
      }

      _owner = owner;

      return _getUserMeet(owner.meetings)
        .then(function (res) {
          _meetings = res.meetings;
          return _meetings;
        })

        .catch(function (err) {
          console.log("Fatality error (promise win): ", err);
        });
    }

    function _getUserMeet(url) {
      return networkService.getData(url).then(function (res) {
        if (!res.meetings) {
          throw new Error('Wrong user meetings file!');
        }

        return res;
      });
    }
  }

})();
