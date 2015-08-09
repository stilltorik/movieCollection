describe('init', function() {
    beforeEach(function() {
    });
    afterEach(function() {
    });

    it('should call the server only when required', function () {
        expect(movie.init()).toBe(1);
    });
});