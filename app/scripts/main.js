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

    var fileModel = new WorkoutEditor.Models.FileModel();

    new WorkoutEditor.Views.FileView({el: $('div.uploader'), model: fileModel});

});
