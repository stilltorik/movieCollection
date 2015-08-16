
window.app = angular.module('movieCollection', []);
app.controller('mainCtrl', ['$scope', function($scope) {

    $scope.i18n = movie.i18n.index;
    angular.element(document).ready(function () {
        movie.init();
        $scope.isDisplayMovies = true;
        $scope.$broadcast('movie.display');
    });

    $scope.displayMovies = function() {
        $scope.isDisplayMovies = true;
        $scope.$broadcast('movie.display');
    };
    $scope.addMovie = function() {
        $scope.isDisplayMovies = false;
        $scope.$broadcast('movie.modify');
    };

}]);

