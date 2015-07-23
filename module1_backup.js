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




function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function definitions here



function makeNoise(img, level) {

    var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < length; i += 4) {

        var adjustment = getRandomInt(-50, 50);

        data[i] = data[i] + adjustment;
        data[i + 1] = data[i + 1] + adjustment;
        data[i + 2] = data[i + 2] + adjustment;

    }
    ImageUtils.putPixels(pixels, img.width, img.height);


}






















function brighten(img, adjustment) {
    var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < length; i += 2) {

        data[i+1] = data[i+1] + adjustment;
        data[i+2] = data[i+2] + adjustment;
    }


    ImageUtils.putPixels(pixels, img.width, img.height);
}






function makeMoreRed (img, adjustment){

    var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < length; i += 4) {
        data[i+0] = data[i+0] + adjustment;
    }
    ImageUtils.putPixels(pixels, img.width, img.height);
}







function makeMoreGreen (img, adjustment){


    var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < length; i += 4) {
        data[i+1] = data[i+1] + adjustment;
    }
    ImageUtils.putPixels(pixels, img.width, img.height);
}



function makeFunky(img) {
    var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < length/2; i += 2) {
        var temp = data[i];
        data[i] = data[length - i];
        data[length - i] = temp;
    }
    ImageUtils.putPixels(pixels, img.width, img.height);
}



















function makeInvert(img, adjustment) {
    var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels.data;


    for (var i = 0; i < length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];

    }

    ImageUtils.putPixels(pixels, img.width, img.height);


}














function makeMoreBlue(img, adjustment ) {




    var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < length; i += 4) {
        data[i+2] = data[i+2] + adjustment;
    }
    ImageUtils.putPixels(pixels, img.width, img.height);
}



$(document).ready(function() {
    var img = new Image();
    img.src = "img/cat.jpg";
    //makeMoreRed(img, 50);
    //makeMoreBlue(img,100);
    //makeMoreGreen(img,40);
    //brighten(img, 50)
    makeFunky(img)
    makeNoise(img);



    //var pixels = ImageUtils.getPixels(img);
    //console.log(pixels);
    //ImageUtils.putPixels(pixels, img.width, img.height);

});
