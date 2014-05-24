'use strict';

angular.module('workoutEditorApp')
  .directive('jkGoogleMap', function () {
    return {
        restrict: 'A',
        template:
        scope: {
        	passedOptions: '=options'
        },
        link: function (scope, element, attr, ngModel) {

        	var defaults = {
        		zoom: 13,
        		mapTypeId: google.maps.MapTypeId.ROADMAP
        	};
 
            scope.options = angular.extend({}, defaults, passedOptions);

            var map = new google.maps.Map(element[0], scope.options);

            var flightPath = new google.maps.Polyline({
				path: this.model.get('coordinates'),
				geodesic: true,
				strokeColor: '#FF0000',
				strokeOpacity: 1.0,
				strokeWeight: 2
			});

        	flightPath.setMap(map);

        }
    };
  });