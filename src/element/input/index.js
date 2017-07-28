var LinElement = require('../index');
var parse = require('../../common/parse').parse;
var inputHtml = require('./input.html');
class LinInput extends LinElement {
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

        var $context = $(parse(inputHtml, {id, type, content})).css(css)
        $context.attr("placeholder", elementJson.properties.placeholder)

        return $context;
    }
}

module.exports = LinInput;