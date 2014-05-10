window.WorkoutEditor.Models.MapModel = Backbone.Model.extend({
    initialize: function() {
        var which = this;
        this.on('change:fileModel', function() {
            var coordinates = [];

            which.get('fileModel').get('data').trackpoints.forEach(function(point) {
                coordinates.push(new google.maps.LatLng(point.get('latitude'), point.get('longitude')));
            });
            which.set('coordinates', coordinates);
        });
    }
});