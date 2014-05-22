'use strict';

angular.module('workoutEditorApp')
  .directive('input', function () {
    return {
        restrict: 'E',
        scope: {
        	ngModel: '='
        },
        link: function (scope, element, attr, ngModel) {
          if (attr.type !== 'file') return;

          // Override the input event and add custom 'path' logic
          element.unbind('change');
          element.bind('change', function () {
            scope.$apply(function() {
            	scope.ngModel = event.target.files[0]
          	}.bind(this));
          });
        }
    };
  });
