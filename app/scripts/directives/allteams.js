'use strict';

angular.module('nhlApp')
  .directive('links', function () {
    return {
      restrict: 'E',
      scope: {
        teams: '=',
        select: '&'
      },
      template: '<div id="links" class="logos">' +
                  '<div id="{{ team.name }}" ng-repeat="team in teams | orderBy: ' + "'location'" + '" ng-click="select({team:team.name})">' +
                    '<img src="images/{{ team.name }}.gif">' +
                    '<br>' +
                    '${{ (team.cap_total / 1000000) | number:1 }}M'+
                  '</div>' +
                '</div>',
    };
  });



  // <div id="{{ team.name }}" ng-repeat="team in allTeams | orderBy:'location'" ng-cloak>
  //   <img src="images/{{ team.name }}.gif">
  //   <br>
  //   ${{ (team.cap_total / 1000000) | number:1 }}M
  // </div>