'use strict';

angular.module('nhlApp')
  .factory('allTeams', function ($http) {
    var url = 'http://127.0.0.1:8000/api/v1/';
    // Public API here
    return {
      getTeams: function () {
        return $http.get(url + 'teams');
      },
      getRandom: function() {
        var random = Math.floor((Math.random()*29)+1);
        return $http.get(url + 'ateam?id=' + random);
      },
      getTeam: function(name) {
        return $http.get(url + 'ateam?name=' + name);
      }
    };
  });
