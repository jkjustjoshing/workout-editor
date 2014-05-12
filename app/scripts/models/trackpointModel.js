window.WorkoutEditor.Models.TrackpointModel = Backbone.Model.extend({
	defaults: {
		latitude: 0,
		longitude: 0,
		time: new Date(),
		altitude: 0,
		distance: 0
	},
	distance: function(otherPoint) {
		var initialLat = this.get('latitude'),
		    initialLong = this.get('longitude'),
		    finalLat = otherPoint.get('latitude'),
		    finalLong = otherPoint.get('longitude');

		if(!initialLat ||
		   !initialLong ||
		   !finalLat ||
		   !finalLong) {
			return 0;
		}

		var R = 3961,
	        dLat = Math.toRadians(finalLat-initialLat),
	        dLon = Math.toRadians(finalLong-initialLong),
	        lat1 = Math.toRadians(initialLat),
	        lat2 = Math.toRadians(finalLat),

	        a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2),
	        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 

	    return R * c;
    }


});