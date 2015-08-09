describe('localStorage', function() {
    beforeEach(function() {
    });
    afterEach(function() {
    });

    it('should call the server only when required', function () {
        expect(movie.frw.localStorage()).toBe(4);
    });
});