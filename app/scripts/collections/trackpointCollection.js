window.WorkoutEditor.Collections.TrackpointCollection = Backbone.Collection.extend({
    model: window.WorkoutEditor.Models.TrackpointModel,
    distance: function() {
    	var distance = 0;
    	for(var i = 0; i < this.length-1; ++i) {
    		distance += this.at(i).distance(this.at(i+1));
    	}
    	return distance;
    }
});