
app.controller('moviesInteractionCtrl', ['$scope', function($scope) {
    $scope.movieList = movie.frw.localStorage.getAll();

    $scope.modify = function(id) {
        $scope.$parent.display(false);
        $scope.$parent.$broadcast('movie.modify', id);
    };
    $scope.delete = function(id) {
        if (confirm('This will delete the movie permanently. Are you sure you want to proceed?')) {
            movie.frw.localStorage.delete(id);
            setTimeout(function() {
                $scope.$apply();
            }, 1);
        }
    };
}]);

