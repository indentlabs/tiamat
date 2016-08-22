app.controller("WorldController", function($scope) {
  console.log("Loaded world controller!");

  // Bounding box corner ordering
  var TOPLEFT     = 0,
      TOPRIGHT    = 1,
      BOTTOMRIGHT = 2,
      BOTTOMLEFT  = 3;

  $scope.world_name = "World Name";
  $scope.world_map_units = {};
  $scope.world_map_geography = {};
  $scope.world_map_topography = {};

  $scope.world_width = 10;
  $scope.world_height = 10;

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
    console.log(bounding_coordinates);
    for (var x = bounding_coordinates[TOPLEFT].x; x < bounding_coordinates[BOTTOMRIGHT].x; x++) {
      // For each *column* of the world's grid...
      world_data.push([]);
      for (var y = bounding_coordinates[TOPLEFT].y; y < bounding_coordinates[BOTTOMRIGHT].y; y++) {
        // For each *row* of of the world's grid...
        world_data[x].push({
          units:      $scope.units_at_coordinate(x, y),
          geography:  $scope.geography_at_coordinate(x, y),
          topography: $scope.topography_at_coordinate(x, y)
        });
      }
    }

    return world_data;
  };

  $scope.units_at_coordinate = function (x, y) {
    return [];
  };

  $scope.geography_at_coordinate = function (x, y) {
    return [];
  };

  $scope.topography_at_coordinate = function (x, y) {
    return [];
  };

  $scope.most_recent_map = $scope.world_map_data();
  console.log($scope.most_recent_map);
});
