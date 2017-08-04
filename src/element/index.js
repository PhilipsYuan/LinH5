require('./element.scss');
var elementHtml = require('./element.tpl.html');
var ANIMATION_TYPE = require('../const/animation').ANIMATION_TYPE;
var animHelper = require('../const/animation');
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

        var anima_obj = this.elementJson.properties.anim[0];
        if (anima_obj) {
			var anima_name = ANIMATION_TYPE[anima_obj.type][anima_obj.direction] || ANIMATION_TYPE[anima_obj.type];
			var anima_duration = anima_obj.duration;
			var anima_delay = anima_obj.delay;
			var anima_count = anima_obj.count;

			//添加动画
			var animation_attr = {
				"animation-name": anima_name,
				"animation-duration": anima_duration + "s",
				"animation-delay": anima_delay + "s",
				"animation-iteration-count": anima_count,
				"animation-direction": "normal",
				"animation-fill-mode": "both"
			}
			this.$box1Div.attr('animation',animation_attr);
        }

        /**
         * 组件内容
         * @type {jQuery}
         */
        this.$context = this.create$context();
        this.$box2Div.append(this.$context);

        return this.$elementDiv1;
    }

    eleShow() {
        animHelper.startAnimation(this);
        if (this.$li && this.compJson.properties.anim && this.compJson.properties.anim.length) this.$li.css('display', 'block');
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