'use strict';

angular.module('nhlApp')
  .directive('d3test', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the d3test directive');
      }
    };
  });
