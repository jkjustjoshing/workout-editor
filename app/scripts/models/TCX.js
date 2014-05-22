'use strict';

angular.module('workoutEditorApp')
  .factory('TCX', function (moment) {
    
    return {
      parse: function(fileContents) {
        var data = {};

        var xml = $($.parseXML(fileContents)).find('TrainingCenterDatabase');

        var activity = xml.children('Activities').first().children('Activity').first();
        data.type = activity.attr('Sport');

        data.laps = [];
        data.trackpoints = new window.WorkoutEditor.Collections.TrackpointCollection();

        activity.children('Lap').each(function(index) {
            var $this = $(this);
            data.laps[index] = {};
            data.laps[index].time = $this.children('TotalTimeSeconds').text();
            data.laps[index].distance = $this.children('DistanceMeters').text();
            
            data.laps[index].trackpointCount = 0;
            $this.children('Track').children('Trackpoint').each(function() {
                data.laps[index].trackpointCount++;
                data.trackpoints.push(new WorkoutEditor.Models.TrackpointModel({
                    latitude: parseFloat($(this).children('Position').children('LatitudeDegrees').text()),
                    longitude: parseFloat($(this).children('Position').children('LongitudeDegrees').text()),
                    time: moment($(this).children('Time').text()),
                    altitude: parseFloat($(this).children('AltitudeMeters').text()),
                    distance: parseFloat($(this).children('DistanceMeters').text())
                }));
            });

        });

        return data;
      } 
    };
  });