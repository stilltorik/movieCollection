describe('localStorage', function() {
    beforeEach(function() {
    });
    afterEach(function() {
        movie.frw.localStorage.reset();
    });

    it('should store the data in the localStorage', function () {
        var data = movie.frw.localStorage.set({data: 4});
        expect(JSON.parse(localStorage.getItem(data.id))).toEqual({id: data.id, data: 4});
        movie.frw.localStorage.set({id: data.id, data: 12});
        expect(JSON.parse(localStorage.getItem(data.id))).toEqual({id: data.id, data: 12});
    });
    it('should retrieve the data from the localStorage', function () {
        var data = movie.frw.localStorage.set({data: 5});
        expect(movie.frw.localStorage.get(data.id)).toEqual(data);
        var data2 = movie.frw.localStorage.set({data: 6});
        expect(movie.frw.localStorage.getAll()).toEqual([data, data2]);
    });
    it('should delete the requested data', function () {
        var data = movie.frw.localStorage.set({data: 5});
        var data2 = movie.frw.localStorage.set({data: 6});
        movie.frw.localStorage.delete(data.id);
        expect(movie.frw.localStorage.getAll()).toEqual([data2]);
        movie.frw.localStorage.reset();
        expect(movie.frw.localStorage.getAll()).toEqual([]);
    });
});