require('./element.scss');
var elementHtml = require('./element.tpl.html');

class LinElement {
    constructor(elementJson) {
        this.elementJson = elementJson;
        this.$elementDiv1 = null;
    }

    /**
     * 创建组件 $li
     *
     * @return {null|any}
     */
    create$li() {
        var {
            id, num, type, css, properties: {lock}
        } = this.elementJson;

        var {
            width, height, left, top, zIndex, bottom, transform, display, opacity
        } = css;

        var elementDiv1 = $(elementHtml);

        elementDiv1.css({
            width,
            height,
            left,
            top,
            zIndex,
            bottom,
            transform,
            display,
            opacity
        });

        /**
         * 控制大小, 坐标,  zIndex, transform, display
         * @type {any}
         */
        this.$elementDiv1 = elementDiv1;

        var boxDivCss = Object.assign({}, css, {
            width: '100%',
            height: '100%',
            transform: 'none',
            fontFamily: '',
            opacity: '',
            marginTop: '0px',
            marginBottom: '0px'
        });

        /**
         * 控制样式的div 控制行高的div
         * @type {jQuery}
         */
        this.$box1Div = this.$elementDiv1.find('.box1')
            .css(boxDivCss);

        /**
         *
         * @type {jQuery}
         */
        this.$box2Div = this.$box1Div.find('.box2');

        /**
         * 组件内容
         * @type {jQuery}
         */
        this.$context = this.create$context();
        this.$box2Div.append(this.$context);

        return this.$elementDiv1;
    }

    /**
     * 创建组件 $context
     * @returns {jQuery}
     */
    create$context() {
        return $();
    }
}

module.exports = LinElement;