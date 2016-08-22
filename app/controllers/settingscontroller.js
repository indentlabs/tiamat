var app = angular.module('tiamat');
app.controller("SettingsController", function($scope) {
	console.log("Loaded settings controller!");

	$scope.generation_settings = {
		land_density_scale: 50,

		// TODO: support flat, square, cylinder, moebius, klein bottle, etc
		world_shape:        'sphere'

	}
});