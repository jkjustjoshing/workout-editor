window.WorkoutEditor.Views.DataView = Backbone.View.extend({
    initialize: function() {
        console.log(this.model.get('data'))
        
        var template = _.template($('#views\\/table').html(), {trackpoints: this.model.get('data').trackpoints});
        this.$el.html(template);
    }
});