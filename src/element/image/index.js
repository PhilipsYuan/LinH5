var LinElement = require('../index');
var imgTpl = require('./image.html');
var parse = require('../../common/parse').parse;
class LinImage extends LinElement {
    constructor(elementJson) {
        super(elementJson);
    }

    /**
     * 创建组件
     */
    create$context() {
        var elementJson = this.elementJson;
        // var host = 'http://res1.eqh5.com/';
        var host = 'images/gghfoFU1/';
        var {
            id, type,
            properties: {src, imgStyle, maskSrc, filter: {type: filterType} = {}}
        } = elementJson;

        // 判断图片是否有滤镜
        if (src.indexOf("imageMogr2") > 0) {
            src = src.substring(0,src.indexOf("imageMogr2") -1 )+"_imageMogr2";
        }
        src = host + src;

        var $context = $(parse(imgTpl, {id, type, src}));
        imgStyle && $context.css(imgStyle);

        return $context;
    }
}
module.exports = LinImage;