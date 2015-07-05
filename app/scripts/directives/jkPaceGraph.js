'use strict';

angular.module('workoutEditorApp')
  .directive('jkPaceGraph', function (Trackpoints, d3, timeFilter) {
    return {
      restrict: 'E',
      scope: {

      },
      link: function (scope, element, attr) {

        // DATA
        var trackpoints = Trackpoints.getList();
        if (trackpoints.length === 0) {
          // no trackpoints, exit
          return;
        }

        var initTime=trackpoints[0].getTime().unix();
        var pace = trackpoints.reduce(function(array, nextTrackpoint, index) {
          if (index > 0) {
            var distance = nextTrackpoint.distance(trackpoints[index - 1]);
            var time = nextTrackpoint.timeDifference(trackpoints[index - 1]);
            var pace = (time / 1000) / distance;

            array.push({ distance, time: nextTrackpoint.getTime().unix()-initTime, pace });
          }
          return array;
        }, []);

        // AXIS
        var margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var x = d3.scale.linear()
            .range([0, width]);

        var sortedPace = pace.map(function (a) { return a.pace; }).sort();
        var y = d3.scale.linear()
            .range([height, 0]);
        x.domain(d3.extent(pace, function(d) { return d.time; }));
        y.domain([sortedPace[Math.floor(sortedPace.length*0.05)], sortedPace[Math.ceil(sortedPace.length*0.95)]]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom')
            .tickFormat(timeFilter);

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left')
            .tickFormat(timeFilter);


        // SVG Canvas
        var svg = d3.select(element[0]).append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
          .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        console.log(d3.extent(pace, function(d) { return d.time; }));
        console.log(d3.extent(pace, function(d) { return d.pace; }), [sortedPace[Math.floor(sortedPace.length*0.05)], sortedPace[Math.ceil(sortedPace.length*0.95)]]);

        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);

        svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis)
          .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('Pace');

        // LINE
        var line = d3.svg.line()
            .x(function(d) {
              return x(d.time);
          })
            .y(function(d) {
              return y(d.pace);
            });

        svg.append('path')
            .attr('class', 'line')
            .attr('stroke', 'blue')
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('d', line(pace));


      }
    };
  });
