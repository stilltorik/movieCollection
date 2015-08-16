
app.controller('addMovieCtrl', ['$scope', function($scope) {
    $scope.init = function(id) {
        $scope.i18n = movie.i18n.addMovie;
        if (id !== undefined) {
          $scope.formData = movie.frw.localStorage.get(id);
        } else {
          $scope.reset(true);
}
    };
    $scope.addMovie = function(formData) {
        var hasError = false;
        $scope.resetMessages(true);
        if (!$scope.formData.movieTitle) {
            hasError = true;
            $scope.errors.title = movie.i18n.errorMessages.movieTitleMissing;
        }
        if (!$scope.formData.description) {
            hasError = true;
            $scope.errors.description = movie.i18n.errorMessages.descriptionMissing;
        }
        if (!$scope.formData.genre) {
            hasError = true;
            $scope.errors.genre = movie.i18n.errorMessages.genreMissing;
        }
        if (!hasError) {
            delete formData.$$hashKey;
            $scope.successfulSave = true;
            movie.frw.localStorage.set(formData);
            $scope.reset(false);
        }
    };
    $scope.reset = function(resetSuccessMessage) {
        $scope.formData = {
            movieTitle: '',
            description: '',
            images: [],
            genre: ''
        };
        $scope.resetMessages(resetSuccessMessage);
    };

    $scope.resetMessages = function(resetSuccessMessage) {
        $scope.errors = {
            title: false,
            description: false,
            genre: false,
            image: false
        };
        if (resetSuccessMessage) {
            $scope.successfulSave = false;
        }
    };
    $scope.removeImage = function(name) {
        for (var i = 0; i < $scope.formData.images.length; i++) {
            if (name === $scope.formData.images[i].name) {
                $scope.formData.images.splice(i, 1);
                return;
            }
        }
    };
    $scope.uploadImage = function(files) {
        $scope.errors.image = false;
        var image = document.getElementById('imageContainer');

        if (files && files[0] && this.validImage(files[0].name)) {
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
        } else {
            $scope.$apply();
        }
    };

    /**
     * Checks if the new image is valid (is actually an image) and that its name is not the one of an already existing image.
     * @param name
     */
    $scope.validImage = function(name) {
        var images = $scope.formData.images;
        var extension = name.substring(name.lastIndexOf('.') + 1).toLowerCase();

        // validate that the file is an image indeed
        if (!(extension === "gif" || extension === "png" || extension === "bmp" ||
            extension === "jpeg" || extension === "jpg")) {
            $scope.errors.image = movie.i18n.errorMessages.invalidFileType;
            return false;
        }

        for (var i = 0; i < images.length; i++) {
            if (images[i].name === name) {
                $scope.errors.image = movie.i18n.errorMessages.imageAlreadyExist;
                return false;
            }
        }
        return true;
    };

    $scope.$on('movie.modify', function(event, id) {
        $scope.init(id);
    });

}]);

