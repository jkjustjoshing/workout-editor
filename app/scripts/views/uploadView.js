window.WorkoutEditor.Views.UploadView = Backbone.View.extend({
    events: {
        'change input[type="file"]': 'fileSelection'
    },
    fileSelection: function(event) {
        this.trigger('fileChanged', event.target.files[0]);
    }
});