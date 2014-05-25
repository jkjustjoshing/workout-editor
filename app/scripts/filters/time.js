'use strict';

angular.module('workoutEditorApp')
  .filter('time', function () {

    return function(seconds, decimalPlaces) {
    	var hours = Math.floor(seconds/3600);
    	var minutes = Math.floor((seconds%3600)/60);
    	var seconds = seconds%60;
      if(seconds < 10) {
      	seconds = '0' + seconds;
      } else {
        seconds = '' + seconds;
      }

      if(hours > 0 && minutes < 10) {
      	minutes = '0' + minutes;
      }

      console.log({
        decimalPlaces: decimalPlaces,
        seconds: seconds
      })
      
      if(decimalPlaces === 0) {
        seconds = seconds.split('.')[0];
      } else if(decimalPlaces !== undefined) {
        var secParts = seconds.split('.');
        if(secParts.length > 1 && secParts[1].length > decimalPlaces) {
          secParts[1] = secParts[1].substr(0, decimalPlaces);
        }
        seconds = secParts.join('.');
      }

      if(hours > 0) {
      	return hours + ':' + minutes + ':' + seconds;
      } else {
      	return minutes + ':' + seconds;
      }

    };

  });