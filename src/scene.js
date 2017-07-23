var Page = require('./page');
var LinBgm = require('./bgm');

class LinScene {
    constructor(sceneJson) {
        //  this.bgAudio = sceneJson.pdata.music.id;
        //  this.main$div = $('#lin');
        this.sceneJson = sceneJson;
        this.pageList = [];
        this.$ele = $('#lin');
    }

    renderScene() {
        // this.renderBgm();
        this.renderPages();
        // this.initPageScroll();
    }

    renderBgm() {
        //渲染背景音乐
        this.createBgm();
    }

    renderPages() {
        this.sceneJson.list.forEach((pageJson, index) => {
            this.initPage(index);
            this.renderPage(index);
        });
    }

    /**
     * 初始化 page
     * @param index
     * @returns {*}
     */
    initPage(index) {
        var pageJson = this.sceneJson.list[index];

        if (pageJson) {
            let page = new Page(pageJson, this);
            this.pageList[index] = page;
            return page;
        }
        throw new Error(`Invalid Page Index: ${index}`);
    }

    /**
     * 渲染 page
     * @param index
     */
    renderPage(index) {
        var linPage = this.pageList[index];
        if (linPage) {
            var $section = linPage.create$section();
            this.$ele.append($section);
        }
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