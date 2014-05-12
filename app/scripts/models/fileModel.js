window.WorkoutEditor.Models.FileModel = Backbone.Model.extend({
	defaults: {
	  file: null,
	  fileContents: ''
	},
	initialize: function() {
		var name = this.get('file').name.split('.');
		var model;
		switch(name[name.length-1]) {
		    case 'tcx': 
		        // Parse as .tcx
		        model = new WorkoutEditor.Models.TcxModel({file: this.get('file')});
		        break;
		    case 'gpx': 
		        // Parse as .tcx
		        model = new WorkoutEditor.Models.GpxModel({file: this.get('file')});
		        break;
		    default:
		        // Not supported file type
		        console.log('File not supported');
		        break;
		}

	    model.on('change:data', function() {
	        this.set('data', model.get('data'));
	    }.bind(this));
	}

});