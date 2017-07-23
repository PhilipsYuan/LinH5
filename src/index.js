var getJson = require('./api').getJson;
var LinScene = require('./scene');

function begin() {
    getJson().then((data) => {
        var sceneJson = {
            list: data.list
        }
        var scene = new LinScene(sceneJson);
        scene.renderScene();
    });
}
$(() => {
    begin();
});
