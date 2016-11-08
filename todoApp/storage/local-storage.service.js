(function () {
  'use strict';

  angular
    .module('storage')
    .factory('localStorageService', LocalStorageService);

  function LocalStorageService() {
    return {
      getData: getData,
      setData: setData,
      removeItem: removeItem
    };

    function getData(name) {
      return JSON.parse(localStorage[name] ? localStorage[name] : '{}');
    }

    function setData(name, value) {
      localStorage.setItem(name, JSON.stringify(value));
    }

    function removeItem(name) {
      localStorage.removeItem(name);
    }
  }

})();
