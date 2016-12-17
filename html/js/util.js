const width = window.innerWidth;
const height = window.innerHeight;
const tileSize = 8;
// Limits contains : [maxHeight, [colors], [costAt0, costAt255]] for each level wanted
const limits = [
    [135, [13, 71, 161]], // Water
    [150, [255, 235, 59]], // Sand
    [220, [51, 105, 30]], // Plains
    [250, [62, 39, 35]], // Mountains
    [255, [245, 245, 245]] // Snow
];
var coefs = [
    [255 / limits[0][0], 0]
];
var map = [],
    places = [];

for (var i = 1; i < limits.length; i++) {
    // Coefs = (y2 - y1) / (x2 - x1) ; (x2y1 - x1y2) / (x2 - x1)
    coefs.push([255 / (limits[i][0] - limits[i - 1][0]), -limits[i - 1][0] * 255 / (limits[i][0] - limits[i - 1][0])]);
}

function toHex(color) {
    let c = color.toString(16);
    if (c.length == 1) {
        return ("0" + c);
    }
    return c;
}

function keyboard(keyCode) {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = function(event) {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };

    //The `upHandler`
    key.upHandler = function(event) {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };

    //Attach event listeners
    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );
    return key;
}
