
movie.frw.localStorage = {};
(function() {
  var initialiseCache = function() {
    var c = {};
    for (var id in localStorage) {
      c[id] = JSON.parse(localStorage.getItem(id));
    }
    return c;
  };

  var cache = initialiseCache();
  var IdCounter = 0;

  var generateId = function() {
    while(localStorage.getItem(IdCounter)) {
      IdCounter++;
    }
    return IdCounter++;
  };

  movie.frw.localStorage.set = function(data) {
    if (data.id === undefined) {
      data.id = generateId();
    }
    cache[data.id] = data;
    localStorage.setItem(data.id, JSON.stringify(data));
    return data;
  };

  movie.frw.localStorage.getAll = function() {
    var result = [];
    for (var id in cache) {
      result.push(cache[id]);
    }
    return result;
  };

  movie.frw.localStorage.get = function(id) {
    return cache[id];
  };

  movie.frw.localStorage.delete = function(id) {
    delete cache[id];
    localStorage.removeItem(id);
  };

  movie.frw.localStorage.reset = function() {
    localStorage.clear();
    cache = {};
  };
})();
