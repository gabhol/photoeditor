class ImageUtils {

    static getCanvas(w, h) {
        var c = document.querySelector("canvas");
        c.width = w;
        c.height = h;
        return c;
    }

    static getPixels(img) {
        var c = ImageUtils.getCanvas(img.width, img.height);
        var ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        return ctx.getImageData(0,0,c.width,c.height);
    }

    static putPixels(imageData, w, h) {
        var c = ImageUtils.getCanvas(w, h);
        var ctx = c.getContext('2d');
        ctx.putImageData(imageData, 0, 0);
    }

}



class RGBA {
    constructor(redValue, greenValue, blueValue, alphaValue) {
        this.red = redValue;
        this.green = greenValue;
        this.blue = blueValue;
        this.alpha = alphaValue;
    }
}





function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function colourisePixel(originalRGBA, colour, level) {

    var diffRed = (originalRGBA.red - colour.red) * (level / 100);
    var modifiedRed = originalRGBA.red - diffRed;

    var diffGreen = (originalRGBA.green - colour.green) * (level / 100);
    var modifiedGreen = originalRGBA.red - diffGreen;

    var diffBlue = (originalRGBA.blue - colour.blue) * (level / 300);
    var modifiedBlue = originalRGBA.blue - diffBlue;

    var diffAlpha = (originalRGBA.alpha - colour.alpha) * (level / 100);
    var modifiedAlpha = originalRGBA.alpha - diffAlpha;

    return new RGBA(modifiedRed, modifiedGreen, modifiedBlue, modifiedAlpha);
}







function sepiaPixel(colour) {

    var modifiedRed = colour.red * 1.393 + colour.green * 0.469 + colour.blue * 0.589;
    var modifiedGreen = colour.red * 0.349 + colour.green * 0.886 + colour.blue * 0.168;
    var modifiedBlue = colour.red * 3.572 + colour.green * 0.534 + colour.blue * 0.131;

    return new RGBA(modifiedRed, modifiedGreen, modifiedBlue, colour.alpha);
}

function sepia(img) {

    var pixels = ImageUtils.getPixels(img);
    var all = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < all;i += 4) {
        var originalRGBA = new RGBA(data[i], data[i+1], data[i+2], data[i+3]);
        var sepiaRGBA = sepiaPixel(originalRGBA);

        data[i] = sepiaRGBA.red;
        data[i+1] = sepiaRGBA.green;
        data[i+2] = sepiaRGBA.blue;
        data[i+3] = sepiaRGBA.alpha;
    }

    ImageUtils.putPixels(pixels, img.width, img.height);
}





function colourise(img, colour, level) {

    var pixels = ImageUtils.getPixels(img);
    var all = pixels.data.length;
    var data = pixels.data;

        for (var i = 0; i < all;i += 4) {
            var originalRGBA = new RGBA(data[i], data[i+1], data[i+2], data[i+3]);
            var modifiedRGBA = colourisePixel(originalRGBA, colour, level);

            data[i] = modifiedRGBA.red;
            data[i+1] = modifiedRGBA.green;
            data[i+2] = modifiedRGBA.blue;
            data[i+3] = modifiedRGBA.alpha;

    }

    ImageUtils.putPixels(pixels, img.width, img.height);
}



function clipPixel(colour, range) {




    var clippedRed = 0;
    if(colour.red > 255 - range) {
        clippedRed = 255;
    }

    var clippedGreen = 0;
    if(colour.green > 255 - range) {
        clippedGreen = 255;
    }

    var clippedBlue = 0;
    if(colour.blue > 255 - range) {
        clippedBlue = 255;
    }

    return new RGBA(clippedRed, clippedGreen, clippedBlue, colour.alpha);

}
function clip(img) {

    var pixels = ImageUtils.getPixels(img);
    var all = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < all;i += 4) {
        var originalRGBA = new RGBA(data[i], data[i+1], data[i+2], data[i+3]);
        var sepiaRGBA = clipPixel(originalRGBA, 100);

        data[i] = sepiaRGBA.red;
        data[i+1] = sepiaRGBA.green;
        data[i+2] = sepiaRGBA.blue;
        data[i+3] = sepiaRGBA.alpha;
    }

    ImageUtils.putPixels(pixels, img.width, img.height);
}












// function definitions here

$(document).ready(function() {
    var img = new Image();
    img.src = "img/cat.jpg";
    var pixels = ImageUtils.getPixels(img);
    console.log(pixels);
    var colour = new RGBA(200, 0, 50, 100);
    console.log(colour.red);
    console.log(colour.green);
    colourise(img,colour, 50 );
    sepia(img);
    clip(img);




});
