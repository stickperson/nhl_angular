'use strict';

angular.module('nhlApp')
  .directive('phone', function () {
    return {
      restrict: 'E',
      scope: {
        dial: '&'
      },
      template: '<div class="button" ng-click="dial()">Call home!</div>'
    };
  });
