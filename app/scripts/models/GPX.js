'use strict';

angular.module('workoutEditorApp')
  .factory('GPX', function (moment) {
    
    return {
      parse: function(fileContents) {
        var data = {},
            $ = angular.element;

        var xml = $($.parseXML(fileContents)).find('gpx');

        var track = xml.children('trk').first();
        data.type = track.children('name').text().split(' ')[0];

        data.trackpoints = [];
        track.children('trkseg').children('trkpt').each(function(index) {
            var $this = $(this);
            data.trackpoints.push({
                latitude: parseFloat($this.attr('lat')),
                longitude: parseFloat($this.attr('lon')),
                time: moment($this.children('time').text())
            });

        });

        return data;
      } 
    };
  });