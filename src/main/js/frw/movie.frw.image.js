movie.frw.image = {};

/**
 * Translate an image into base64 so it can be stored in a string.
 * @param img - image to translate
 * @returns {string} - image as a string.
 */
movie.frw.image.getBase64Image = function(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
};