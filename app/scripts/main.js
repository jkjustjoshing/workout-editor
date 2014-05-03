/*global WorkoutEditor, $*/
'use strict';

if(window.File && window.FileReader && window.FileList && window.Blob) {
    $('html').addClass('filereader');
} else {
    $('html').addClass('no-filereader');
}

window.WorkoutEditor = {
    Models: {
        FileModel: Backbone.Model.extend({
            defaults: {
                file: null,
                fileContents: ''
            },
            updateFile: function(file) {
                this.set('file', file);
                var fr = new FileReader();

                fr.onload = (function(e) {
                    this.set('fileContents', fr.result);
                }).bind(this);

                fr.readAsText(file);
            }

        })
    },
    Collections: {},
    Views: {
        FileView: Backbone.View.extend({
            events: {
                'change input[type="file"]': 'fileSelection'
            },
            initialize: function() {
                console.log('being initialized', this.$el)
                this.model.on('change:fileContents', this.render, this);
            },
            fileSelection: function(event) {
                console.log(event);
                this.model.updateFile(event.target.files[0]);

                console.log(this.model)
            },
            render: function() {
                var contents = this.$el.children('.contents');
                if(contents.length) {
                    contents.text(this.model.get('fileContents'));
                } else {
                    contents = $('<div class="contents"></div>');
                    contents.text(this.model.get('fileContents'));
                    this.$el.append(contents);
                }
            }
        })
    },
    Routers: {},
    init: function () {
        console.log('Hello from Backbone!');
    }
};

$(document).ready(function () {
    WorkoutEditor.init();

    var model = new WorkoutEditor.Models.FileModel();

    new WorkoutEditor.Views.FileView({el: $('div.uploader'), model: model});

});
