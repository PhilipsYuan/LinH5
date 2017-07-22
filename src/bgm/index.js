var bgmBtnHtml = require('./bgmBtn.html');

class LinBgm {
    constructor(bgAudioJson, linScene) {
        this.$bgmBtn = $(bgmBtnHtml);
        this.linScene = linScene;
    }


    create$bgm () {
        this.$bgmBtn.find('audio').attr('src', 'http://res3.maka.im/common/music/fugu/gudianhuiwei.mp3');
        this.linScene.main$div.append(this.$bgmBtn);
        this.show();
    }

    /**
     * 显示背景音乐按钮
     */
    show() {
        this.$bgmBtn.show();
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
}

module.exports = LinBgm;