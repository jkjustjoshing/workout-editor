/*global WorkoutEditor, $*/
'use strict';

if(window.File && window.FileReader && window.FileList && window.Blob) {
    $('html').addClass('filereader');
} else {
    $('html').addClass('no-filereader');
}

window.WorkoutEditor = {
    Collections: {},
    Views: {},
    Models: {},
    Routers: {},
    init: function () {
        console.log('Hello from Backbone!');
    }
};

$(document).ready(function () {
    WorkoutEditor.init();

    var uploadView = new WorkoutEditor.Views.UploadView({el: $('div.uploader'), });
    var mapModel = new WorkoutEditor.Models.MapModel();

    uploadView.on('fileChanged', function(file) {
        var model = new WorkoutEditor.Models.FileModel({file: file});
               
        model.on('change:data', function() {
            mapModel.set('fileModel', model);
            new WorkoutEditor.Views.MapView({el: $('.map'), model: mapModel});
            new WorkoutEditor.Views.DataView({el: $('.data'), model: model});
        });


    });

});

Math.toRadians = function(deg) {
  return deg * (Math.PI/180)
};