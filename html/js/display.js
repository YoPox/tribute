class Display {
    constructor() {}

    static drawMap(map, g) {

        for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map[i].length; j++) {

                let color1, color2, color3;

                if (map[i][j] < WL) { // Water
                    // Linear function
                    // 0 -> 0 ; 100/255 -> 255
                    let newval = map[i][j] / 0.39;
                    color1 = toHex(Math.floor((255 - newval) / 6 + 13));
                    color2 = toHex(Math.floor((255 - newval) / 6 + 71));
                    color3 = toHex(Math.floor((255 - newval) / 6 + 161));
                } else { // Land
                    // Linear function
                    // 100/255 -> 0 ; 255 -> 255
                    let newval = 1.645 * map[i][j] - 164.5;
                    color1 = toHex(Math.floor((255 - newval) / 4 + 51));
                    color2 = toHex(Math.floor((255 - newval) / 4 + 105));
                    color3 = toHex(Math.floor((255 - newval) / 4 + 30));
                }

                // Draws the square
                g.beginFill("0x" + color1 + color2 + color3);
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
