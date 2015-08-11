
app.controller('addMovieCtrl', ['$scope', function($scope) {
    $scope.init = function(id) {
      if (id) {
          $scope.formData = movie.frw.localStorage.get(id);
      } else {
          $scope.reset();
      }
    };
    $scope.addMovie = function(formData) {
        $scope.formData = movie.frw.localStorage.set(formData);
    };
    $scope.reset = function() {
        $scope.formData = {
            movieTitle: '',
            description: '',
            images: [],
            genre: ''
        };
    };

    $scope.removeImage = function(name) {
        for (var i = 0; i < $scope.formData.images.length; i++) {
            if (name === $scope.formData.images[i].name) {
                $scope.formData.images.splice(i, 1);
                console.log($scope.formData.images);
                return;
            }
        }
        console.log('no image removed');
    };
    $scope.uploadImage = function(files) {
        var image = document.getElementById('imageContainer');

        if (files && files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                image.src =  e.target.result;
                // we need to save the image asynchronously, so the "display" in the image container is performed before.
                setTimeout(function(){
                    $scope.formData.images.push({name: files[0].name, data: movie.frw.image.getBase64Image(image)});
                    $scope.$apply();
                }, 1);
            };

            reader.readAsDataURL(files[0]);
        }
    };
    $scope.init();

}]);

