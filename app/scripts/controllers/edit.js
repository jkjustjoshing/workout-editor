'use strict';

angular.module('workoutEditorApp')
  .controller('EditCtrl', function ($scope, Trackpoints, $state) {
    var ctrl = this;

    if(Trackpoints.getList().length === 0) {
    	$state.transitionTo('/');
    	return;
    }

    ctrl.totalDistance = Trackpoints.totalDistance();

    ctrl.distanceIntervals = 1;

    $scope.$watch(function () { return ctrl.distanceIntervals; }, function(newVal) {
    	if(newVal) {
    		ctrl.laps = Trackpoints.getLaps(newVal);


    	}
    });

    ctrl.newPace = [];
    ctrl.updatePace = updatePace;

    function updatePace (newPace, lap) {
      var time = /^([0-9]{1,2}):([0-9]{2})$/;
      var match = newPace.match(time);
      if (match) {
        var seconds = parseInt(match[2], 10);
        var minutes = parseInt(match[1], 10);
        var newTime = seconds + (minutes * 60);
        Trackpoints.setLap(lap.startPoint, lap.endPoint, newTime);
      } else {
        console.log('bad time');
      }
    }

  });
