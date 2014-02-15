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
        var CONFIG = {
          minCircleRadius: 20,
          maxCircleRadius: 50,
          selectedStrokeWidth: 2,
          unselectedStrokeWidth: 2,
          selectedOpacity: 0.6,
          unselectedOpacity: 0.2,
        };

        var positions = ['c', 'lw', 'rw', 'd', 'g'];

        var convertCap =  function(cap) {
          return (cap/1000000).toFixed(3).toString() + 'M';
        };

        var positionSelected = function(p) {
          var svg = d3.select('svg');
          var circles = d3.selectAll('circle');
          circles.style('opacity', function(d) {
            return d.position == p.position ? CONFIG.selectedOpacity : CONFIG.unselectedOpacity;
          })
          .style('stroke-width', function(d) {
            return d.position == p.position ? CONFIG.selectedStrokeWidth : CONFIG.unselectedStrokeWidth;
          });
          showPopup(p, this);
        };

        var positionUnselected = function(p) {
          var circles = d3.selectAll('circle');
          circles.style('opacity', function(d) {
            return CONFIG.selectedOpacity;
          })
          .style('stroke-width', function(d) {
            return CONFIG.unselectedStrokeWidth;
          });
          removePopup();
        };

        var showPopup = function(position, el) {
          var svgPosition = $('#ice').position();
          var offsetTop = svgPosition.top;
          var offsetLeft = svgPosition.left;
          var circle = d3.select(el);
          var top = parseInt(circle.attr('cy'), 10);
          var left = parseInt(circle.attr('cx'), 10);
          var r = parseInt(circle.attr('r'), 10);
          var popupTemplate = _.template(d3.select('#popupTemplate').html());
          var orderedPlayers = _.sortBy(position.players, function(p) { return - p.cap_hit; });
          var pop = d3.select('#selected-position');
          _.each(position.players, function(player) {
            player['small_cap'] = convertCap(player.cap_hit);
          });
          pop
            .html(popupTemplate({
              data: {
                // team: teams[0],
                players: position.players,
                position: position.position,
                cap: position.cap_small,
                orderedPlayers: orderedPlayers,
                location: position.location,
                team: position.team_name,
                logo: position.logo_name
              }
            }))
            .style('opacity', 1)
            .style('top', top + offsetTop + 'px')
            .style('left', left + offsetLeft + 'px');
        };

        var removePopup = function() {
          var popup = $('#selected-position');
          popup.html('');
          popup.css('opacity', 0);
        };

        var drawCircles = function(data) {
          var seed = {};
          var centers = {
            'position': 'Centers',
            'players': data.centers,
            'cap': data.center_cap,
            'location': data.location,
            'team_name': data.full_name,
            'logo_name': data.name,
            'cap_small': convertCap(data.center_cap)
          };
          var defense = {
            'position': 'Defensemen',
            'players': data.defense,
            'cap': data.d_cap,
            'location': data.location,
            'team_name': data.full_name,
            'logo_name': data.name,
            'cap_small': convertCap(data.d_cap)
          };
          var lws = {
            'position': 'Left Wings',
            'players': data.lws,
            'cap': data.lw_cap,
            'location': data.location,
            'team_name': data.full_name,
            'logo_name': data.name,
            'cap_small': convertCap(data.lw_cap)
          };
          var rws = {
            'position': 'Right Wings',
            'players': data.rws,
            'cap': data.rw_cap,
            'location': data.location,
            'team_name': data.full_name,
            'logo_name': data.name,
            'cap_small': convertCap(data.rw_cap)
          };
          var goalies = {
            'position': 'Goalies',
            'players': data.goalies,
            'cap': data.g_cap,
            'location': data.location,
            'team_name': data.full_name,
            'logo_name': data.name,
            'cap_small': convertCap(data.g_cap)
          };
          seed['c'] = centers;
          seed['d'] = defense;
          seed['lw'] = lws;
          seed['rw'] = rws;
          seed['g'] = goalies;
          var min_cap = _.min([data.center_cap, data.d_cap, data.lw_cap, data.rw_cap, data.g_cap]);
          var max_cap = _.max([data.center_cap, data.d_cap, data.lw_cap, data.rw_cap, data.g_cap]);
          var scale = d3.scale.linear()
              .domain([min_cap, max_cap])
              .range([20, 100]);

          positions.forEach(function(p) {
            var circle = d3.selectAll('#' + p)
              .datum(seed[p])
              .on({
                mouseover: positionSelected,
                mouseout: positionUnselected
              })
              .transition()
              .duration(750)
                .attr('r', function(d) {
                  return scale(d.cap);
                })
                .attr('fill', '#' + data.primary_color)
                .attr('stroke', '#' + data.secondary_color)
                .style('opacity', CONFIG.selectedOpacity)
                .style('stroke-width', CONFIG.unselectedStrokeWidth);
          });
        };

        scope.$watch('team', function(data){
          if (data){
            drawCircles(data);
          }
        });
      }
    };
  });