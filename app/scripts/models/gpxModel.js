window.WorkoutEditor.Models.GpxModel = Backbone.Model.extend({
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

      var xml = $($.parseXML(this.get('fileContents'))).find('gpx');

      var track = xml.children('trk').first();
      data.type = track.children('name').text().split(' ')[0];

      data.trackpoints = new window.WorkoutEditor.Collections.TrackpointCollection();
      track.children('trkseg').children('trkpt').each(function(index) {
          var $this = $(this);
          data.trackpoints.push(new WorkoutEditor.Models.TrackpointModel({
              latitude: parseFloat($this.attr('lat')),
              longitude: parseFloat($this.attr('lon')),
              time: new Date($this.children('time').text())
          }));

      });

      this.set('data', data);
  }

});