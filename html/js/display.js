class Display {
    constructor() {}

    static drawMap(map, g) {

        for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map[i].length; j++) {

                let col = getColors(map[i][j]);

                // Draws the square
                g.beginFill("0x" + col[0] + col[1] + col[2]);
                g.drawRect(j * 8, i * 8, 8, 8);
                g.endFill();

            }
        }

        // Use tiles
        // for (var i = 0; i < map.length; i++) {
        //     for (var j = 0; j < map[i].length; j++) {
        //         tilemap.push(new PIXI.Sprite(tiles[map[i][j]]));
        //         let n = tilemap.length - 1;
        //         tilemap[n].x = 16 * j;
        //         tilemap[n].y = 16 * i;
        //         stage.addChild(tilemap[n]);
        //     }
        // }

    }

}

function getColors(height) {
    let limit = 0;
    for (var i = 0; i < limits.length - 1; i++) {
        if (height >= limits[i][0] && height <= limits[i + 1][0]) {
            limit = i + 1;
        }
    }
    let newh = coefs[limit][0] * height + coefs[limit][1];

    let color1 = toHex(Math.floor((255 - newh / 2 + limits[limit][1][0]) / 2)),
        color2 = toHex(Math.floor((255 - newh / 2 + limits[limit][1][1]) / 2)),
        color3 = toHex(Math.floor((255 - newh / 2 + limits[limit][1][2]) / 2));
    
    return ([color1, color2, color3]);
}
