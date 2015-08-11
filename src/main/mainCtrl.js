
window.app = angular.module('movieCollection', []);
app.controller('mainCtrl', ['$scope', function($scope) {
    movie.init();
    $scope.displayMovies = true;

    $scope.display = function(isDisplayMovies) {
        $scope.displayMovies = isDisplayMovies;
    }
}]);

