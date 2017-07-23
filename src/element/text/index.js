var LinElement = require('../index');
var parse = require('../../common/parse').parse;
var textHtml = require('./text.html');
class LinText extends LinElement {
    constructor(elementJson) {
        super(elementJson);
    }

    /**
     * 创建组件
     */
    create$context() {
        var elementJson = this.elementJson;
        var {
            id, type, content, sceneId, publishTime,
            css: {fontSize, width, height, writingMode},
            properties: {anim = []}
        } = elementJson;

        var css = {
            fontSize: fontSize,
            width: width,
            height: height
        };

        var $context = $(parse(textHtml, {id, type, content})).css(css)

        return $context;
    }
}

module.exports = LinText;