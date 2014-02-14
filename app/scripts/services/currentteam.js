'use strict';

angular.module('nhlApp')
  .factory('currentTeam', function () {

    // Public API here
    return {
      getRandom: function () {
        return meaningOfLife;
      }
    };
  });
