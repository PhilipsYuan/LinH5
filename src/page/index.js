require('./page.scss');
var pageHtml = require('./tpl.html');

class Page {
    constructor(pageJson) {
        this.pageJson =pageJson
    }

    /**
     * 创建 page 的 dom 结构
     * @return {jQuery}
     */
    create$section() {
        var {
            num, id,
            elements: compJsonList = []
        } = this.pageJson;

        /**
         * section节点
         * @type {jQuery}
         */
        this.$section = $(pageHtml);

/*        compJsonList // 添加元素
            .map((json) => {
                json.name = this.getCompName(json);
                return json;
            })
            .filter(({type}) => COMP_TYPE[type] !== 'EqxBackground' && COMP_TYPE[type] !== 'EqxGravity')
            .sort(({css: {zIndex: aIndex}}, {css: {zIndex: bIndex}}) => {
                return aIndex - bIndex;
            })
            .map((compJson, i) => { // 重新定义 zIndex
                compJson.num = i + 1;
                compJson.css.zIndex = i + 1;
                return compJson;
            })
            .forEach((compJson) => {
                var eqxComp = this.initEqxCompByJson(compJson);
                this.renderEqxComp(eqxComp);
            });*/

/*        // 非电脑端让ul居中显示
        if (!isPc()) {
            if (window.top === window) {
                // 非iframe
                this.setUlTopAndLeft();
            } else {
                // 嵌入iframe
                this.setIframeUlTopAndLeft();
            }
        }*/

        return this.$section;
    }
}

module.exports = Page;