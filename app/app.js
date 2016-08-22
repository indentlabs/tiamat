'use strict';

var angular_dependencies = [
  'ui.router'
];

console.log('loading app.js');

var app = angular.module('tiamat', angular_dependencies);

require('./controllers/maincontroller.js');
require('./controllers/settingscontroller.js');
require('./controllers/worldcontroller.js');

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('welcome', {
    url:         '/welcome',
    templateUrl: 'app/views/_welcome.html'
  })

  .state('settings', {
    url:         '/settings',
    templateUrl: 'app/views/_settings.html',
    controller:  "SettingsController"
  })

  .state('world', {
    url:         '/world',
    templateUrl: 'app/views/_world_map.html',
    controller:  "WorldController"
  })

  $urlRouterProvider.otherwise('/welcome');
});

