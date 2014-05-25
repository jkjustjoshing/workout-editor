'use strict';

angular.module('workoutEditorApp')
  .factory('TCX', function (moment) {
    
    return {
      parse: function(fileContents) {
        var data = {},
            $ = angular.element;

        var xml = $($.parseXML(fileContents)).find('TrainingCenterDatabase');

        var activity = xml.children('Activities').first().children('Activity').first();
        data.type = activity.attr('Sport');

        data.trackpoints = [];

        activity.children('Lap').each(function() {
            $(this).children('Track').children('Trackpoint').each(function() {
                data.trackpoints.push({
                    latitude: parseFloat($(this).children('Position').children('LatitudeDegrees').text()),
                    longitude: parseFloat($(this).children('Position').children('LongitudeDegrees').text()),
                    time: moment($(this).children('Time').text()),
                    altitudeMeters: parseFloat($(this).children('AltitudeMeters').text())
                });
            });
        });

        return data;
      } 
    };
  });