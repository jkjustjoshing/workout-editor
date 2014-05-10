window.WorkoutEditor.Models.TrackpointModel = Backbone.Model.extend({
	defaults: {
		latitude: 0,
		longitude: 0,
		time: new Date(),
		altitude: 0,
		distance: 0
	}
});