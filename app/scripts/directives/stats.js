'use strict';

angular.module('nhlApp')
  .directive('stats', function () {
    return {
      restrict: 'A',
      scope: {
        team: '=',
        averages: '='
      },
      templateUrl: 'views/stats.html'
    };
  });
