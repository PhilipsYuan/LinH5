require('./page.scss');
var pageHtml = require('./tpl.html');
var elementListDiv = require('./elementListDiv.html');
var ELEMENT_TYPE = require('../const/element').ELEMENT_TYPE;
var ANIMATION_TYPE = require('../const/animation').ANIMATION_TYPE;
var ELEMENT_MAP = require('../const/elementMap');
var LinElement = require('../element');

class Page {
    constructor(pageJson) {
        this.pageJson =pageJson;
        this.linELementList = [];
    }

    /**
     * 创建 page 的 dom 结构
     * @return {jQuery}
     */
    create$section() {
        var {
            num, id,
            elements: elementJsonList = []
        } = this.pageJson;

        /**
         * section节点
         * @type {jQuery}
         */
        this.$pageDiv = $(pageHtml);
        this.$elementListDiv = $(elementListDiv);
        this.$pageDiv.append(this.$elementListDiv);

        elementJsonList // 添加元素
            .filter(({type}) => ELEMENT_TYPE[type] == 'LinText' || ELEMENT_TYPE[type] == 'LinImage' || ELEMENT_TYPE[type] == 'LinInput' || ELEMENT_TYPE[type] == 'LinSubmitButton' || ELEMENT_TYPE[type] == 'LinShape')
            .sort(({css: {zIndex: aIndex}}, {css: {zIndex: bIndex}}) => {
                return aIndex - bIndex;
            })
            .map((elementJson, i) => { // 重新定义 zIndex
                elementJson.num = i + 1;
                elementJson.css.zIndex = i + 1;
                return elementJson;
            })
            .forEach((elementJson) => {
                var LinComp = this.initLinCompByJson(elementJson);
                this.renderLinComp(LinComp);
            });

        return this.$pageDiv;
    }

    /**
     * 根据组件Json，添加对应的实例（添加组件自己的方法，对应Html，属性）
     */
    initLinCompByJson(elementJson) {
        var ClassName = ELEMENT_MAP[elementJson.type];
        if(ClassName) {
            var linComp = new ClassName(elementJson, this);
            this.linELementList.push(linComp);
            return linComp;
        }
    }


    /**
     * 渲染组件（根据组件的实例）
     */
    renderLinComp(linComp) {
        if (linComp && linComp instanceof LinElement) {
            var $li = linComp.$li;
            $li = linComp.create$li();
            this.$elementListDiv.append($li);
            return $li;
        }
    }

    show() {
        this.linELementList.forEach((ele) => {
            ele.eleShow();
        });
        this.$pageDiv.addClass('activePage');
    }

    hide() {
        this.$pageDiv.removeClass('activePage')
    }

}

module.exports = Page;