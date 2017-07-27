var LinElement = require('../index');
var backgroundTpl = require('./background.html');
var parse = require('../../common/parse').parse;
class LinBackground extends LinElement {
    constructor(elementJson) {
        super(elementJson);
    }

    /**
     * 创建组件
     */
    create$context() {
        var elementJson = this.elementJson;
        var host = 'http://res1.eqh5.com/';
        var {
            id, type,
            properties: {src, imgStyle, maskSrc, filter: {type: filterType} = {}}
        } = elementJson;

        // 判断图片是否有滤镜
        src = host + src;
        var $context = $(parse(backgroundTpl, {id, type, src}));
        imgStyle && $context.css(imgStyle);

        return $context;
    }
}
module.exports = LinBackground;