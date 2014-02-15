'use strict';

angular.module('nhlApp')
  .controller('MainCtrl', function ($scope, allTeams) {
    $scope.setupComplete = false;
    $scope.actions = {
      getTeam: function(team){
        allTeams.getTeam(team).then(function(result) {
          $scope.currentTeam = result.data.objects[0];
        });
      },
      getStats: function(teams){
        var stats = {};
        var c_avg = (d3.mean(_.pluck(teams, 'center_cap'))/1000000).toFixed(3);
        var lw_avg = (d3.mean(_.pluck(teams, 'lw_cap'))/1000000).toFixed(3);
        var rw_avg = (d3.mean(_.pluck(teams, 'rw_cap'))/1000000).toFixed(3);
        var d_avg = (d3.mean(_.pluck(teams, 'd_cap'))/1000000).toFixed(3);
        var g_avg = (d3.mean(_.pluck(teams, 'g_cap'))/1000000).toFixed(3);
        stats['c'] = c_avg;
        stats['lw'] = lw_avg;
        stats['rw'] = rw_avg;
        stats['d'] = d_avg;
        stats['g'] = g_avg;
        console.log('loggin stats');
        return stats;
      },
     setupLabels: function(){
        var forwards_g = d3.select('#forwards');
        forwards_g.selectAll('text')
          .data(['Forwards'])
          .enter()
          .append('text')
          .attr('x', function(d) {
            return 0;
          })
          .attr('y', function(d) {
            return $('#c').attr('cy');
          })
          .style('color', 'red')
          .style('font-family', 'Helvetica Neue, sans-serif')
          .style('font-weight', '100')
          .style('letter-spacing', '10px')
          .style('font-size', '17px')
          .text('FORWARDS');

        var defense_g = d3.select('#defense');
        defense_g.selectAll('text')
          .data(['Defensemen'])
          .enter()
          .append('text')
          .attr('x', function(d) {
            return 0;
          })
          .attr('y', function(d) {
            return $('#d').attr('cy');
          })
          .style('color', 'red')
          .style('font-family', 'Helvetica Neue, sans-serif')
          .style('font-weight', '100')
          .style('letter-spacing', '10px')
          .style('font-size', '17px')
          .text('DEFENSE');

        var goalies_g = d3.select('#goalie');
        goalies_g.selectAll('text')
          .data(['Goalies'])
          .enter()
          .append('text')
          .attr('x', function(d) {
            return 0;
          })
          .attr('y', function(d) {
            return $('#g').attr('cy');
          })
          .style('color', 'red')
          .style('font-family', 'Helvetica Neue, sans-serif')
          .style('font-weight', '100')
          .style('letter-spacing', '10px')
          .style('font-size', '17px')
          .text('GOALIES');
      },
    };

    if (!$scope.setupComplete){
      allTeams.getTeams().then(function (result){
        $scope.allTeams = result.data.objects;
        $scope.leagueStats = $scope.actions.getStats($scope.allTeams);
      });
      allTeams.getRandom().then(function (result) {
        $scope.currentTeam = result.data.objects[0];
        $scope.actions.setupLabels();
      });
      $scope.setupComplete = true;
    }
  });
