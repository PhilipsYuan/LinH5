var bgmBtnHtml = require('./bgmBtn.html');

class LinBgm {
    constructor(bgAudioJson, linScene) {
        this.$bgmBtn = $(bgmBtnHtml);
        this.linScene = linScene;
    }


    create$bgm () {
        this.$bgmBtn.find('audio').attr('src', 'images/869ba36d129d4e80bc7d0813792c58b3.mp3');
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