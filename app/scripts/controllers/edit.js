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

  });
