'use strict';

angular.module('nhlApp')
  .directive('links', function () {
    return {
      restrict: 'E',
      scope: {
        teams: '=',
        select: '&',
        team: '='
      },
      template: '<div id="links" class="logos">' +
                  '<div id="{{ team.name }}" ng-repeat="team in teams | orderBy: ' + "'location'" + '" ng-click="select({team:team.name})">' +
                    '<img src="images/{{ team.name }}.gif">' +
                    '<br>' +
                    '${{ (team.cap_total / 1000000) | number:1 }}M' +
                  '</div>' +
                '</div>',
      link: function(scope, element) {
        var updateBox = function(team) {
              var divs = d3.selectAll('#links div');
              angular.forEach(divs[0], function(div) {
                var id = $(div).attr('id');
                $(div).css('border', function() {
                  return id == team.name ? '1px solid #ccc' : '1px solid white';
                });
              });
          };
        scope.$watch('team', function(data) {
          if (data) {
            updateBox(data);
          }
        });
      }
    };
  });