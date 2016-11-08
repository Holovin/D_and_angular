(function () {
  'use strict';

  angular
    .module('dataProvider')
    .factory('networkService', NetworkService);

  NetworkService.$inject = ['$http'];

  function NetworkService($http) {
    return {
      getData: getData
    };

    function getData(url) {
      return $http.get(url).then(function(res) {
        return res.data;
      })
    }
  }

})();
