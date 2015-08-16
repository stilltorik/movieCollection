
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

  /**
   * Store movie data in the local storage. If the movie does not yet have an id (new movie), an id is provided to it
   * @param data - movie data
   * @returns {*} - the movie data, with an id (if the movie did not have one, one is provided).
   */
  movie.frw.localStorage.set = function(data) {
    if (data.id === undefined) {
      data.id = generateId();
    }
    cache[data.id] = data;
    localStorage.setItem(data.id, JSON.stringify(data));
    return data;
  };

  /**
   * Returns an array containing all the movies.
   * @returns {Array} - the list of movies
   */
  movie.frw.localStorage.getAll = function() {
    var result = [];
    for (var id in cache) {
      if (cache[id]) {
        result.push(cache[id]);
      }
    }
    return result;
  };

  /**
   * Returns the movie with the provided id.
   * @param id - the id of the movie requested.
   * @returns {*} - the movie with the provided id.
   */
  movie.frw.localStorage.get = function(id) {
    return cache[id];
  };

  /**
   * Deletes the movie with the provided id
   * @param id - id of the movie to delete
   */
  movie.frw.localStorage.delete = function(id) {
    delete cache[id];
    localStorage.removeItem(id);
  };

  /**
   * Deletes all the movies data.
   */
  movie.frw.localStorage.reset = function() {
    localStorage.clear();
    cache = {};
  };
})();
