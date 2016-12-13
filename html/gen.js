class Gen {

    constructor() {}

    static generate(w, h, seed) {

        let scale = 20;
        let safeland = 0.35;
        let lim = (Math.pow(w - 8, 2) + Math.pow(h - 8, 2)) / 4;
        noise.seed(seed);

        let map = []

        for (var i = 0; i < h; i++) {
            let temp = [];
            for (var j = 0; j < w; j++) {
                let dx = Math.pow(2 * i / (h - 1) - 1, 2),
                    dy = Math.pow(2 * j / (w - 1) - 1, 2),
                    r = (dx + dy);
                if (r > 1)
                    temp.push(0);
                else if (r < safeland) {
                    temp.push(Math.floor(255 / 2 * (noise.perlin2(j / scale, i / scale) + 1)));
                } else {
                    let newr = (r - safeland) / (1 - safeland);
                    temp.push(Math.floor(255 / 2 * (Math.cos(newr * Math.PI / 2) * (noise.perlin2(j / scale, i / scale) + 1))));
                    }
                }
                map.push(temp);
            }

            return map;

        }

    }
