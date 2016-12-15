class Gen {

    constructor() {}

    static generate(w, h, seed) {

        let scale = 20;
        let lim = (Math.pow(w - 8, 2) + Math.pow(h - 8, 2)) / 4;
        noise.seed(seed);

        let map = []

        for (var i = 0; i < h; i++) {
            let temp = [];
            for (var j = 0; j < w; j++) {
                let dx = Math.pow(2 * i / (h - 1) - 1, 2),
                    dy = Math.pow(2 * j / (w - 1) - 1, 2),
                    r = (dx + dy);
                temp.push(Math.floor(255 / 2 * filter(r) * (noise.perlin2(j / scale, i / scale) + 1)));
            }
            map.push(temp);
        }

        // placeTowns(map);

        return map;

    }

}

function filter(t) {
    return (0.64 - Math.atan(8 * (t - 0.63) - 0.5) / (1.25 * Math.PI));
}

function placeTowns(map) {
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            if (map[i][j] > WL && Math.random() > 0.996) {
                map[i][j] = -1;
            }
        }
    }
}
