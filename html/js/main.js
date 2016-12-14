var renderer = new PIXI.autoDetectRenderer(1280, 720, {
    antialias: false,
    transparent: false,
    resolution: 1
});

document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
var graphics = new PIXI.Graphics();

PIXI.loader
    .add('assets/tileset.json')
    .load(onAssetsLoaded);

function onAssetsLoaded() {

    // var tiles = PIXI.loader.resources["assets/tileset.json"].textures;

    var spaceKey = keyboard(32);
    spaceKey.press = function() {
        genMap();
    };
    genMap();

    stage.addChild(graphics);
    renderer.render(stage);

}

function genMap() {
    map = Gen.generate(width / 8, height / 8, Math.random());
    Display.drawMap(map, graphics);
    renderer.render(stage);
}
