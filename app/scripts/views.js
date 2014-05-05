window.WorkoutEditor.Views = {
    MapsView: Backbone.View.extend({
        initialize: function() {
          var mapOptions = {
            zoom: 3,
            center: this.model.get('coordinates')[0],
            mapTypeId: google.maps.MapTypeId.TERRAIN
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
        initialize: function() {
            console.log('being initialized', this.$el)
            this.model.on('change:data', this.render, this);
            this.model.on('change:mapsModel', this.mapModel, this);
        },
        fileSelection: function(event) {
            this.model.updateFile(event.target.files[0]);
        },
        render: function() {
            if(this.model.get('data')) {
                var data = this.$el.children('.data');
                if(data.length) {
                    data.text(JSON.stringify(this.model.get('data').toJSON()));
                } else {
                    data = $('<div class="data"></div>');
                    console.log(this.model.get('data'))
                    data.text(JSON.stringify(this.model.get('data')));
                    this.$el.append(data);
                }
            }
        },
        mapModel: function() {
          this.mapView = new window.WorkoutEditor.Views.MapsView({
            el: $('div.map'), 
            model: this.model.get('mapsModel')
          });
        }
    })
};