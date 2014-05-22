'use strict';

angular.module('workoutEditorApp')
  .factory('Trackpoints', function () {
    
    var Trackpoint = function(data) {
    	this.data = {
    		latitude: data.latitude,
    		longitude: data.longitude,
    		elevation: data.elevation,
    		time: data.time
    	};
    };
    Trackpoint.prototype.distance = function(otherPoint) {
    	var initialLat = this.data.latitude,
		    initialLong = this.data.longitude,
		    finalLat = otherPoint.data.latitude,
		    finalLong = otherPoint.data.longitude;

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
    };
 
    var trackpoints = [];

    return {
    	new: function(data) {
    		return new Trackpoint(data);
    	},
    	add: function(point) {
    		if(point instanceof Trackpoint) {
    			trackpoints.push(point);
    		} else {
    			trackpoints.push(new Trackpoint(point));
    		}
    	},
  		addList: function(array) {
  			array.forEach(function(point) {
  				this.add(point);
  			}.bind(this));
  		},
  		getList: function() {
  			return trackpoints;
  		},
      setList: function(array) {
        trackpoints = [];
        this.addList(array);
      },
  		totalDistance: function() {
	  		var length = 0;
	  		for(var i = 1; i < trackpoints.length; ++i) {
	  			length += trackpoints[i].distance(trackpoints[i-1]);
	  		}
  			return length;
  		}
    };
  });
