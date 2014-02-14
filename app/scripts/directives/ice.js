'use strict';

angular.module('nhlApp')
  .directive('ice', function () {
    return {
      restrict: 'E',
      scope: {
        team: '='
      },
      template: '<svg id="ice">' +
                  '<g id="forwards">' +
                    '<circle id="lw" cx="280" cy="125" r="0" fill="#ffffff"/>' +
                    '<circle id="lw" cx="280" cy="125" r="0" fill="#ffffff"/>' +
                    '<circle id="lw" cx="280" cy="125" r="0" fill="#ffffff"/>' +
                    '<circle id="c" cx="460" cy="125" r="0" fill="#ffffff"/>' +
                    '<circle id="rw" cx="640" cy="125" r="0" fill="#ffffff"/>' +
                  '</g>' +
                  '<g id="defense">' +
                    '<circle id="d" cx="370" cy="275" r="0" fill="#ffffff"/>' +
                    '<circle id="d" cx="550" cy="275" r="0" fill="#ffffff"/>' +
                  '</g>' +
                  '<g id="goalie">' +
                    '<circle id="g" cx="460" cy="425" r="0" fill="#ffffff"/>' +
                  '</g>' +
                '</svg>',
      link: function(scope, element) {
        scope.$watch('team', function(data){
          if (data){
            console.log(data);
          }
        });
      }
    };
  });