var bgmBtnHtml = require('./bgmBtn.html');

class LinBgm {
    constructor(bgAudioJson, linScene) {
        this.$bgmBtn = $(bgmBtnHtml);
        this.linScene = linScene;
        this.bgAudioJson = bgAudioJson;
        this.$audio = this.$bgmBtn.find("audio")[0];
        // this.bindEventListeners();
    }

    create$bgm () {
        this.$bgmBtn.find('audio').attr('src', this.bgAudioJson);
        $("#lin").append(this.$bgmBtn);
        this.show();
    }

    /**
     * 显示背景音乐按钮
     */
    show() {
        this.$bgmBtn.show();
        this.$bgmBtn.addClass("rotate");
    }

    bindEventListeners () {
        var touchStart = false;
        this.$audio.on('click', (e) => {
                // this.$bgmBtn.addClass("rotate");
                this.$bgmBtn.toggleClass("rotate");
            });
    }

    /**
     * 隐藏背景音乐按钮
     */
    hide() {
        this.$bgmBtn.hide();
    }

    start() {
        //
    }

    stop() {

    }

    startRotate(){
        this.$bgmBtn.addClass("rotate");
    }

    startRotate(){
        this.$bgmBtn.removeClass("rotate");
    }
}

module.exports = LinBgm;