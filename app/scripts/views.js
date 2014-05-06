window.WorkoutEditor.Views = {
    MapsView: Backbone.View.extend({
        initialize: function() {
          var mapOptions = {
            zoom: 13,
            center: this.model.get('coordinates')[0],
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          var map = new google.maps.Map(this.$el[0],
              mapOptions);

          var flightPath = new google.maps.Polyline({
            path: this.model.get('coordinates'),
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
          });

          flightPath.setMap(map);

        }
    }),
    FileView: Backbone.View.extend({
        events: {
            'change input[type="file"]': 'fileSelection'
        },
        fileSelection: function(event) {
            this.trigger('fileChanged', event.target.files[0]);
        }
    })
};