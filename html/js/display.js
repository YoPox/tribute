class Display {
    constructor() {}

    static drawMap(map, g) {
        for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map[i].length; j++) {
                let color1, color2, color3;
                if (map[i][j] < WL) {
                    color1 = "0D";
                    color2 = "47";
                    color3 = "A1";
                } else {
                    color1 = toHex(Math.floor(((225 - map[i][j]) / 1.25 + 51) / 2));
                    color2 = toHex(Math.floor(((225 - map[i][j]) / 1.25 + 105) / 2));
                    color3 = toHex(Math.floor(((225 - map[i][j]) / 1.25 + 30) / 2));
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
