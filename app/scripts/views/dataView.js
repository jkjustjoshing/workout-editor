window.WorkoutEditor.Views.DataView = Backbone.View.extend({
    events: {
        'change #startTime': 'updateTimes',
        'change #stopTime': 'updateTimes'
    },
    initialize: function() {
        window.d = this.model.get('data')

        var trackpoints = this.model.get('data').trackpoints;
        var times = {
        	start: trackpoints.first().get('time'),
        	stop: trackpoints.last().get('time'),
        	duration: moment(trackpoints.last().get('time')).subtract(trackpoints.first().get('time'))
        };

        var template = _.template($('#views\\/table').html(), {
        	trackpoints: trackpoints,
        	times: times,
            distance: Math.round(100 * trackpoints.distance()) / 100
        });
        this.$el.html(template);
    },
    updateTimes: function(event) {
    	console.log(event.target.id, event.target.value)

    }
});