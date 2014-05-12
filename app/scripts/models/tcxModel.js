window.WorkoutEditor.Models.TcxModel = Backbone.Model.extend({
    defaults: {
        file: null,
        fileContents: ''
    },
    initialize: function() {
        var which = this;
        this.on('change:file', function() {
            var fr = new FileReader();

            fr.onload = (function(e) {
                this.set('fileContents', fr.result);
                this.parse();
            }).bind(this);

            fr.readAsText(which.get('file'));
        });

        this.trigger('change:file');
    },
    parse: function() {
        var data = {};

        var xml = $($.parseXML(this.get('fileContents'))).find('TrainingCenterDatabase');

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

        this.set('data', data);
    }

});