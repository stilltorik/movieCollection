

angular.module('movieCollection', []).controller('mainCtrl', function() {
    movie.init();
    var MC = this;
    MC.changeMessage = function() {
        var messages = ['Hello World', 'Bonjour la Terre', 'Hallo Welt'];
        document.getElementById('message').innerHTML = messages[Math.floor(Math.random() * messages.length)];
    };
});

