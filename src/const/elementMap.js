var LinImage = require('../element/image');
var LinText = require('../element/text');
var LinBackground = require('../element/background');
var LinShape = require('../element/shape');
var LinInput = require('../element/input');
var LinSubmitButton = require('../element/submitbutton');

/**
 * 组件类型工厂
 *
 */
module.exports = {
    2: LinText,
    3: LinBackground,
    4: LinImage,
    h: LinShape,
    5: LinInput,
    501: LinInput,
    502: LinInput,
    503: LinInput,
    504: LinInput,
    6: LinSubmitButton,
    601: LinSubmitButton
};
