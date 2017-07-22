var getJson = require('./api').getJson;
var LinScene = require('./scene');

function begin() {
    getJson().then((sceneJson) => {
        var scene = new LinScene(sceneJson);
        scene.renderScene();
    });
}
$(() => {
    begin();
});
