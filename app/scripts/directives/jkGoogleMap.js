'use strict';

angular.module('workoutEditorApp')
  .directive('jkGoogleMap', function (Trackpoints) {
    return {
      restrict: 'E',
      scope: {
        passedOptions: '&'
      },
      link: function (scope, element, attr, ngModel) {

        var defaults = {
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        scope.options = angular.extend({}, defaults, scope.passedOptions);


        var initial = true;
        scope.$watch(function() {return Trackpoints.getList();}, function(newVal) {
          if(newVal && newVal.length && initial) {
            initial = false;

            var googleCoordinates = [];

            newVal.forEach(function(dataPoint) {
              googleCoordinates.push(dataPoint.getGoogleLatLng());
            });

            var map = new google.maps.Map(element[0], scope.options);


            var flightPath = new google.maps.Polyline({
              path: googleCoordinates,
              geodesic: true,
              strokeColor: '#FF0000',
              strokeOpacity: 1.0,
              strokeWeight: 2
            });

            flightPath.setMap(map);

            var bounds = new google.maps.LatLngBounds();
            bounds.extend(Trackpoints.getNorthEast().getGoogleLatLng());
            bounds.extend(Trackpoints.getSouthWest().getGoogleLatLng());

            map.fitBounds(bounds);

          }
        });

      }
    };
  });
