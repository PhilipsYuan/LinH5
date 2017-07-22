var LinPage = require('./page/page');
var LinBgm = require('./bgm');

class LinScene {
    constructor(sceneJson) {
        this.bgAudio = sceneJson.pdata.music.id;
        this.main$div = $('#lin');
    }

    renderScene() {
        this.renderBgm();
        this.renderPages();
        // this.initPageScroll();
    }

    renderBgm() {
        //渲染背景音乐
        this.createBgm();
    }


    renderPages() {
        // 渲染页面
       // var page = new LinPage();
    }

    /**
     * 初始化翻页器
     */
    initPageScroll() {
        if (!this.config.disablePageScroll) {
            this.pageScroll = new PageScroll(this);
        }
    }

    /**
     * 创建bgm
     * @param json
     * @returns {EqxBgm}
     */
    createBgm(json) {
        var bgAudio = json || this.bgAudio;
        if (bgAudio) {
            this.bgm = new LinBgm(bgAudio, this);
            this.bgm.create$bgm();
        }
    }
}

module.exports = LinScene;