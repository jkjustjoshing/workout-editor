window.WorkoutEditor.Collections.TrackpointCollection = Backbone.Collection.extend({
    model: window.WorkoutEditor.Models.TrackpointModel,
    distance: function() {
    	var distance = 0;
    	for(var i = 0; i < this.length-1; ++i) {
    		distance += this.at(i).distance(this.at(i+1));
    	}
    	return distance;
    },
    paces: function() {
    	var paces = [],
    	    lapStart = this.at(0).get('time'),
    	    lapDistance = 0;
    	    distance = 0;
    	for(var i = 0; i < this.length-1; ++i) {
    		var thisDist = this.at(i).distance(this.at(i+1));
    		distance += thisDist;
    		if(distance >= lapDistance + 1) {
    			lapDistance++;
    			paces.push({
    				mile: lapDistance,
    				startTime: lapStart,
    				endTime: this.at(i+1).get('time'),
    				distance: 1,
    				elapsed: this.at(i+1).get('time').diff(lapStart) / 1000
    			});
    			lapStart = this.at(i+1).get('time');
    		}
    	}
    	return paces;
    }

});