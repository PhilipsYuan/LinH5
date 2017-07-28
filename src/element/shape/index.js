var LinElement = require('../index');
var shapeTpl = require('./shape.html');
var parse = require('../../common/parse').parse;
class LinShape extends LinElement {
    constructor(elementJson) {
        super(elementJson);
    }

    /**
     * 创建组件
     */
    create$context() {
        console.info("create shape");

        var elementJson = this.elementJson;
        var host = 'http://res1.eqh5.com/';
        var {
            id, type,
            properties: {src, imgStyle, maskSrc, filter: {type: filterType} = {}}
        } = elementJson;

        var {
            id, type, content, sceneId, publishTime,
            css: {fontSize, width, height, writingMode},
            properties: {
                anim = [],
                items = [],
            }
        } = elementJson;

        // 判断图片是否有滤镜
        src = host + src;
        var $context = $(parse(shapeTpl, {id, type, src}));
        imgStyle && $context.css(imgStyle);

        return $context;
    }
}
module.exports = LinShape;