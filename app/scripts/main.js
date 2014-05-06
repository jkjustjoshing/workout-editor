/*global WorkoutEditor, $*/
'use strict';

if(window.File && window.FileReader && window.FileList && window.Blob) {
    $('html').addClass('filereader');
} else {
    $('html').addClass('no-filereader');
}

window.WorkoutEditor = {
    Collections: {},
    Routers: {},
    init: function () {
        console.log('Hello from Backbone!');
    }
};

$(document).ready(function () {
    WorkoutEditor.init();

    var fileView = new WorkoutEditor.Views.FileView({el: $('div.uploader'), });
    var mapModel = new WorkoutEditor.Models.MapsModel();

    fileView.on('fileChanged', function(file) {
        var name = file.name.split('.');
        var model;
        switch(name[name.length-1]) {
            case 'tcx': 
                // Parse as .tcx
                model = new WorkoutEditor.Models.TcxModel({file: file});
                break;
            default:
                // Not supported file type
                
                break;
        }

        model.on('change:data', function() {
            mapModel.set('fileModel', model);
            new WorkoutEditor.Views.MapsView({el: $('.map'), model: mapModel});
        });


    });

});
