webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular_dependencies = [
	  'ui.router'
	];

	console.log('loading app.js');

	var app = angular.module('tiamat', angular_dependencies);

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);

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



/***/ },
/* 1 */
/***/ function(module, exports) {

	var app = angular.module('tiamat');
	app.controller("MainController", function($scope) {
		console.log("Loaded main controller!");
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	var app = angular.module('tiamat');
	app.controller("SettingsController", function($scope) {
		console.log("Loaded settings controller!");

		$scope.generation_settings = {
			land_density_scale: 50,

			// TODO: support flat, square, cylinder, moebius, klein bottle, etc
			world_shape:        'sphere'

		}
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	var app = angular.module('tiamat');
	app.controller("WorldController", function($scope) {
	  console.log("Loaded world controller!");

	  // Bounding box corner ordering
	  var TOPLEFT     = 0,
	      TOPRIGHT    = 1,
	      BOTTOMRIGHT = 2,
	      BOTTOMLEFT  = 3;

	  // TODO: move these to some lower level file
	  var TOPOGRAPHY = {
	    GRASS: 0,
	    WATER: 1
	  };

	  $scope.world_name           = "World Name"; // TODO: autogenerate and/or config
	  $scope.world_map_units      = {};
	  $scope.world_map_topography = {};

	  $scope.world_width  = 64;
	  $scope.world_height = 28;

	  // returns [top_left, top_right, bottom_right, bottom_left] coordinates for bounding box
	  $scope.drawable_coordinate_boundaries = function () {
	    // TODO: Draw coordinates for current zoom level (also allows PC movement);
	    // for now, just return the whole world to draw

	    return [
	      {x: 0,                  y: 0},
	      {x: $scope.world_width, y: 0},
	      {x: $scope.world_width, y: $scope.world_height},
	      {x: 0,                  y: $scope.world_height}
	    ];
	  };

	  $scope.world_map_data = function () {
	    // TODO: Draw visual map with coordinates / UI indicators for values
	    // For now, just output values at each coordinate
	    var world_data = [];

	    var bounding_coordinates = $scope.drawable_coordinate_boundaries();
	    for (var y = bounding_coordinates[TOPLEFT].y; y < bounding_coordinates[BOTTOMRIGHT].y; y++) {
	      // For each *row* of the world's grid...
	      world_data.push([]);

	      for (var x = bounding_coordinates[TOPLEFT].x; x < bounding_coordinates[BOTTOMRIGHT].x; x++) {
	        // For each *column* of this row in the world's grid...
	        world_data[y].push({
	          units:      $scope.units_at_coordinate(x, y),
	          topography: $scope.topography_at_coordinate(x, y)
	        });
	      }
	    }

	    return world_data;
	  };

	  $scope.units_at_coordinate = function (x, y) {
	    return [];
	  };

	  $scope.topography_at_coordinate = function (x, y) {
	    // TODO: support multiple topographical features returned here
	    return $scope.world_map_topography[y][x];
	  };

	  $scope.class_for_topography_id = function (tid) {
	    // TODO: reverse-lookup this, instead of switch case
	    switch (tid) {
	      case 0:  return 'grass';   break;
	      case 1:  return 'water';   break;
	      default: return 'unknown'; break;
	    }
	  };

	  $scope.generate_random_world_topography = function () {
	    $scope.world_map_topography = [];

	    var bounding_coordinates = $scope.drawable_coordinate_boundaries();
	    for (var y = bounding_coordinates[TOPLEFT].y; y < bounding_coordinates[BOTTOMRIGHT].y; y++) {
	      $scope.world_map_topography.push([]);
	      for (var x = bounding_coordinates[TOPLEFT].x; x < bounding_coordinates[BOTTOMRIGHT].x; x++) {
	        if (chance.bool({likelihood: 70})) {
	          $scope.world_map_topography[y][x] = TOPOGRAPHY.GRASS;
	        } else {
	          $scope.world_map_topography[y][x] = TOPOGRAPHY.WATER;
	        }
	      }
	    }

	    // Redraw map with new topography
	    $scope.most_recent_map = $scope.world_map_data();
	  };

	  // Generate an original world
	  $scope.generate_random_world_topography();

	  // Fetch original world state to show before mutating forward
	  $scope.most_recent_map = $scope.world_map_data();
	  console.log($scope.most_recent_map);
	});


/***/ }
]);