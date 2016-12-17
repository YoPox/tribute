var renderer = new PIXI.autoDetectRenderer(width, height, {
    antialias: false,
    transparent: false,
    resolution: 1
});

document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
var graphics = new PIXI.Graphics();

// Loads the tileset, but it isn't used anyway…
PIXI.loader
    .add('assets/tileset.json')
    .load(onAssetsLoaded);

function onAssetsLoaded() {

    // var tiles = PIXI.loader.resources["assets/tileset.json"].textures;

    var spaceKey = keyboard(32);
    spaceKey.press = function() {
        genMap();
    };

    stage.addChild(graphics);
    genMap();

}

function genMap() {
    places = [];
    map = Gen.generate(width / tileSize, height / tileSize, Math.random());
    Display.drawMap(map, graphics);
    renderer.render(stage);
}
