var page = require('webpage').create();

var renderSizesToFile = function(sizes, callbackPerSize, callbackFinal) {
    var sizeIndex = 0;
    var webpage = require("webpage");
    var page = null;
    var getFilename = function() {
        return "rendermulti-" + sizeIndex + ".png";
    };

    var next = function(status, size, file) {
        page.close();
        callbackPerSize(status, size, file);
        return retrieve();
    };

    var retrieve = function() {
        var size;
        if (sizes.length > 0) {
            size = sizes.shift();
            sizeIndex++;
            page = webpage.create();
            page.viewportSize = size;
            page.settings.userAgent = "Phantom.js bot";
            return page.open("http://www.boligsiden.dk", function(status) {
                var file;
                file = getFilename();
                if (status === "success") {
                    return window.setTimeout((function() {
                        page.render(file);
                        return next(status, size, file);
                    }), 200);
                } else {
                    return next(status, size, file);
                }
            });
        } else {
            return callbackFinal();
        }
    };
    return retrieve();
};



var sizeIPhone5 = { width: 320, height: 568 };
var sizeIPhone6 = { width: 375, height: 667 };
var sizeIPad = { width: 768, height: 1024 };
var sizeDesktop = { width: 1920, height: 1080 };

var sizes = [
  sizeIPhone5,
  sizeIPhone6,
  sizeIPad,
  sizeDesktop
];

renderSizesToFile(sizes, (function(status, size, file) {
    if (status !== "success") {
        return console.log("Unable to render '" + size + "'");
    } else {
        return console.log("Rendered '" + size + "' at '" + file + "'");
    }
}), function() {
    return phantom.exit();
});


// console.log('Desktop');
// page.viewportSize = sizeDesktop;
// page.open('http://www.boligsiden.dk/', function() {
//   console.log('Desktop');
//   page.render('boligsiden-desktop.png');
//   phantom.exit();
// });

// console.log('iPhone 5');
// page.viewportSize = sizeIPhone5;
// page.open('http://www.boligsiden.dk/', function() {
//   console.log('iPhone 5');
//   page.render('boligsiden-iphone5.png');
//   phantom.exit();
// });

// console.log('iPhone 6');
// page.viewportSize = sizeIPhone6;
// page.open('http://www.boligsiden.dk/', function() {
//   console.log('iPhone 6');
//   page.render('boligsiden-iphone6.png');
//   phantom.exit();
// });

// console.log('ipad');
// page.viewportSize = sizeIPad;
// page.open('http://www.boligsiden.dk/', function() {
//   console.log('ipad');
//   page.render('boligsiden-ipad.png');
//   phantom.exit();
// });