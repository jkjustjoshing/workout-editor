'use strict';

angular.module('workoutEditorApp')
  .controller('EditCtrl', function ($scope, Trackpoints, $state) {
    $scope.points = Trackpoints.getList();

    if(!$scope.points || $scope.points.length === 0) {
    	$state.transitionTo('/');
    	return;
    }

    $scope.totalDistance = Trackpoints.totalDistance();


  });