'use strict';

angular.module('workoutEditorApp')
  .directive('jkGoogleMap', function () {
    return {
        restrict: 'A',
        scope: {
        	passedOptions: '&',
            data: '='
        },
        link: function (scope, element, attr, ngModel) {

        	var defaults = {
        		zoom: 13,
        		mapTypeId: google.maps.MapTypeId.ROADMAP
        	};
 
            scope.options = angular.extend({}, defaults, scope.passedOptions);

            console.log(element[0])


            var initial = true;
            scope.$watch('data', function(newVal) {
                if(newVal && newVal.length && initial) {
                    initial = false;

                    var googleCoordinates = [];

                    scope.data.forEach(function(dataPoint) {
                        googleCoordinates.push(new google.maps.LatLng(dataPoint.getLatitude(), dataPoint.getLongitude()));
                    });

                    console.log(googleCoordinates)


                    scope.options.center = googleCoordinates[0];

                    var map = new google.maps.Map(element[0], scope.options);


                    var flightPath = new google.maps.Polyline({
                        path: googleCoordinates,
                        geodesic: true,
                        strokeColor: '#FF0000',
                        strokeOpacity: 1.0,
                        strokeWeight: 2
                    });

                    flightPath.setMap(map);

                }
            });

        }
    };
  });