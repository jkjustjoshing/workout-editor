'use strict';

angular.module('workoutEditorApp')
  .controller('MainCtrl', function ($scope, GPX, TCX, Trackpoints, $state) {
    $scope.$watch('file', function(newVal, oldVal) {
    	if(newVal) {
    		var fr = new FileReader();
    		fr.readAsText(newVal);
    		fr.onload = function() {
          // Parse
          var name = newVal.name.split('.');
          switch(name[name.length-1]) {
				    case 'tcx':
			        // Parse as .tcx
			        var data = TCX.parse(fr.result);
			        Trackpoints.setList(data.trackpoints);
			        break;
				    case 'gpx':
			        // Parse as .tcx
			        var data = GPX.parse(fr.result);
			        Trackpoints.setList(data.trackpoints);
			        break;
				    default:
			        // Not supported file type
			        console.log('File not supported');
			        break;
					}
					$state.go('edit');
        };
    	}
    });

    window.Trackpoints = Trackpoints;

  });
