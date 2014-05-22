'use strict';

angular.module('workoutEditorApp')
  .controller('MainCtrl', function ($scope, GPX, Trackpoints) {
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
				        model = new WorkoutEditor.Models.TcxModel({file: this.get('file')});
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
				console.log(Trackpoints.getList(), Trackpoints.totalDistance());
            };
    	}
    });
  });