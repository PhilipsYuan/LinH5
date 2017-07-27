var LinImage = require('../element/image');
var LinText = require('../element/text');
var LinBackground = require('../element/background');
var LinShape = require('../element/shape');

/**
 * 组件类型工厂
 *
 */
module.exports = {
    2: LinText,
    3: LinBackground,
    4: LinImage,
    h: LinShape
};
