'use strict';

angular
  .module('workoutEditorApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('/', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      });
  });
