// Source file name: button.ts
// Author: Louis Smith
// Last modified by: Louis Smith
// Last modified date: 25/02/2015
// Description: This code is the only way I was able to get the music playing
var managers;
(function (managers) {
    // Image and Sound Manifest;
    var assetManifest = [
        { id: "music", src: "assets/sounds/background_music.mp3" }
    ];
    var Assets = (function () {
        function Assets() {
        }
        Assets.init = function () {
            createjs.Sound.initializeDefaultPlugins();
            createjs.Sound.alternateExtensions = ["mp3"];
            this.loader = new createjs.LoadQueue();
            this.loader.installPlugin(createjs.Sound);
            this.loader.loadManifest(assetManifest);
        };
        return Assets;
    })();
    managers.Assets = Assets;
})(managers || (managers = {}));
//# sourceMappingURL=asset.js.map
