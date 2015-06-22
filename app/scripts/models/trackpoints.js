'use strict';

angular.module('workoutEditorApp')
  .factory('Trackpoints', function (moment) {

    var Trackpoint = function(data) {
    	this.data = {
    		latitude: data.latitude,
    		longitude: data.longitude,
    		elevation: data.elevation,
    		time: moment(data.time)
    	};
    };
    Trackpoint.prototype.getLatitude = function() {
      return this.data.latitude;
    };
    Trackpoint.prototype.getLongitude = function() {
      return this.data.longitude;
    };
    Trackpoint.prototype.getTime = function() {
      return this.data.time;
    };
    Trackpoint.prototype.getGoogleLatLng = function() {
      return new google.maps.LatLng(this.data.latitude, this.data.longitude);
    }
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

    var getBoundingPoints = function() {
      var upperLeft = {
        latitude: trackpoints[0].getLatitude(),
        longitude: trackpoints[0].getLongitude()
      };
      var lowerRight = {
        latitude: trackpoints[0].getLatitude(),
        longitude: trackpoints[0].getLongitude()
      };

      trackpoints.forEach(function(point) {
        if(point.getLatitude() > upperLeft.latitude ) {
          upperLeft.latitude = point.getLatitude();
        } else if(point.getLatitude() < lowerRight.latitude) {
          lowerRight.latitude = point.getLatitude();
        }

        if(point.getLongitude() < upperLeft.longitude ) {
          upperLeft.longitude = point.getLongitude();
        } else if(point.getLongitude() > lowerRight.longitude) {
          lowerRight.longitude = point.getLongitude();
        }
      });

      return {
        upperLeft: upperLeft,
        lowerRight: lowerRight
      };
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
  		},
      getLaps: function(lapDistance) {
        if(!lapDistance) {
          lapDistance = 1;
        }

        var lapNumber = 1;
        var totalLength = 0;
        var laps = [];
        var lastLapPoint = trackpoints[0];
        for(var i = 1; i < trackpoints.length; ++i) {
          totalLength += trackpoints[i].distance(trackpoints[i-1]);

          if(totalLength > lapNumber*lapDistance) {
            laps.push({
              seconds: trackpoints[i].getTime().diff(lastLapPoint.getTime()) / 1000,
              distance: lapDistance,
              totalDistance: totalLength,
              startPoint: lastLapPoint,
              endPoint: trackpoints[i]
            });

            lastLapPoint = trackpoints[i];
            lapNumber++;
          } else if (i+1 === trackpoints.length) {
            // Last point - finish the lap

            var lapDistance = totalLength - laps[laps.length-1].totalDistance;

            laps.push({
              seconds: trackpoints[i].getTime().diff(lastLapPoint.getTime()) / 1000,
              distance: lapDistance,
              totalDistance: totalLength,
              startPoint: lastLapPoint,
              endPoint: trackpoints[i]
            });
          }
        }

        return laps;

      },

      setLap: function (firstTrackpoint, lastTrackpoint, newTime) {
        debugger;
        var firstIndex = trackpoints.indexOf(firstTrackpoint);
        var lastIndex = trackpoints.indexOf(lastTrackpoint);
        if (!(firstIndex >= 0 && lastIndex >= 0)) {
          throw new Error('Trackpoints not found in trackpoint array');
        }

        var oldTime = lastTrackpoint.data.time.diff(firstTrackpoint.data.time);
        var scale =

        for (var i = firstIndex; i < trackpoints.length; ++i) {



        }
      },

      // Assumption: doesn't cross longitude 180/-180
      getCenterPoint: function() {
        var points = getBoundingPoints();

        var centerPoint = new Trackpoint({
          latitude: (points.upperLeft.latitude + points.lowerRight.latitude) / 2,
          longitude: (points.upperLeft.longitude + points.lowerRight.longitude) / 2
        });

        return centerPoint;
      },
      getNorthEast: function() {
        var points = getBoundingPoints();
        return new Trackpoint({
          latitude: points.upperLeft.latitude,
          longitude: points.lowerRight.longitude
        });
      },
      getSouthWest: function() {
        var points = getBoundingPoints();
        return new Trackpoint({
          latitude: points.lowerRight.latitude,
          longitude: points.upperLeft.longitude
        });
      }
    };
  });
