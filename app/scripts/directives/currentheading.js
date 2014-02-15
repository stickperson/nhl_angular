'use strict';

angular.module('nhlApp')
  .directive('currentHeading', function () {
    return {
      restrict: 'A',
      scope: {
        team: '='
      },
      template: '<div id="current-text">' +
                  '<h3><a href="http://{{ team.name }}.nhl.com" target="_blank">{{ team.location }} {{ team.full_name }}</a></h3>' +
                '</div>' +
                '<div id="current-logo" class="logos">' +
                  '<img src="images/{{team.name}}.gif">' +
                '</div>',
      link: function(scope, element) {
        scope.$watch('team', function(data){
          if (data){
            console.log('team changed in heading');
            console.log(data);
          }
        });
      }
    };
  });

