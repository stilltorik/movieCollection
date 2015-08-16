
app.controller('moviesInteractionCtrl', ['$scope', function($scope) {
    $scope.modify = function(id) {
        $scope.$parent.addMovie();
        $scope.$parent.$broadcast('movie.modify', id);
    };
    $scope.delete = function(id) {
        if (confirm($scope.i18n.deleteConfMessage)) {
            movie.frw.localStorage.delete(id);
            $scope.movieList = movie.frw.localStorage.getAll();
        }
    };

    $scope.$on('movie.display', function() {
        $scope.i18n = movie.i18n.movieInteraction;
        $scope.movieList = movie.frw.localStorage.getAll();
    });
}]);

