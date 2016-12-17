class Gen {

    constructor() {}

    static generate(w, h, seed) {

        let scale = 18 + Math.random() * 6,
            thinScale = scale / (1.5 + Math.random()),
            intensity = 4 + Math.random() * 2;

        let lim = (Math.pow(w - 8, 2) + Math.pow(h - 8, 2)) / 4;
        noise.seed(seed);

        let map = []

        for (var i = 0; i < h; i++) {
            let temp = [];
            for (var j = 0; j < w; j++) {
                let dx = Math.pow(2 * i / (h - 1) - 1, 2),
                    dy = Math.pow(2 * j / (w - 1) - 1, 2),
                    r = (dx + dy),
                    noise1 = noise.perlin2(j / scale, i / scale),
                    noise2 = noise.perlin2(j / thinScale, i / thinScale);
                temp.push(Math.floor(255 / 2 * filter(r) * (noise1 + 1)) +
                    255 / (2 * intensity) * (noise2));
            }
            map.push(temp);
        }

        // Normalize makes sure that the highest tile is at level 255
        normalize(map);
        placeTowns(map);

        return map;

    }

}

function filter(t) {
    // Elliptic filter
    // 0 -> 1 ; 0.5 -> 0.89 ; 0.8 -> 0.46 ; 1 -> 0.34
    return 1.6 - t;
}

function placeTowns(map) {
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            if (map[i][j] > limits[0][0] && Math.random() > 0.996) {
                places.push(new Town(j, i));
            }
        }
    }
}

function normalize(map) {
    // Get the max
    let maxVal = 0;
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            if (map[i][j] > maxVal) {
                maxVal = map[i][j];
            }
        }
    }
    // Multiply heights
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            map[i][j] = Math.floor(map[i][j] * 255 / maxVal);
        }
    }
}
