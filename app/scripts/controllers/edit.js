'use strict';

angular.module('workoutEditorApp')
  .controller('EditCtrl', function ($scope, Trackpoints, $state) {

    if(Trackpoints.getList().length === 0) {
    	$state.transitionTo('/');
    	return;
    }

    $scope.totalDistance = Trackpoints.totalDistance();

    $scope.distanceIntervals = 1;


    $scope.$watch('distanceIntervals', function(newVal) {
    	if(newVal) {
    		$scope.laps = Trackpoints.getLaps(newVal);


    	}
    });

  });