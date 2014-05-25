'use strict';

angular.module('workoutEditorApp')
  .filter('time', function () {

    return function(seconds) {
    	var hours = Math.floor(seconds/3600);
    	var minutes = Math.floor((seconds%3600)/60);
    	var seconds = seconds%60;
      if(seconds < 10) {
      	seconds = '0' + seconds;
      }

      if(hours > 0 && minutes < 10) {
      	minutes = '0' + minutes;
      }

      if(hours > 0) {
      	return hours + ':' + minutes + ':' + seconds;
      } else {
      	return minutes + ':' + seconds;
      }

    };

  });