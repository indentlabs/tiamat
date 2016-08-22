var app_dependencies = [
	'ui.router'
];

var app = angular.module('tiamat', app_dependencies);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/welcome');

	$stateProvider
	.state('welcome', {
		url:         '/welcome',
		templateUrl: '_welcome.html'
	})

	.state('settings', {
		url:         '/settings',
		templateUrl: '_settings.html',
		controller:  "SettingsController"
	})

	.state('world', {
		url:         '/world',
		templateUrl: '_world_map.html',
		controller:  "WorldController"
	})
});
