var LinElement = require('../index');
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
        // var host = 'http://res1.eqh5.com/';
        var host = 'images/gghfoFU1/';
        
        var {
            id,
            properties: {viewBox = '0 0 64 64', src, items}
        } = elementJson;
        var NAMESPACE = 'http://www.w3.org/2000/svg';
        let element = document.createElementNS(NAMESPACE, 'svg');
        element.setAttribute('class', 'element svg-element');
        this.getSvg(src)
            .then(function(res) {
                var svg = res.getElementsByTagName('svg');
                var tempViewBox = svg[0].viewBox.baseVal;

                var svgWidth = parseFloat($(svg).attr('width')) || tempViewBox.width;
                var svgHeight = parseFloat($(svg).attr('height')) || tempViewBox.height;
                var $subSvg = $(svg).find("[fill], [style*='fill']") || [];

                if(items) {
                    if ($subSvg.length == items.length) {
                        for (var i = 0; i < items.length; i++) {
                            $subSvg.eq(i).css({'fill': items[i].fill});
                        }
                    } else {
                        $.each($subSvg, function (i, ele) {
                            for (var k = 0; k < items.length; k++) {
                                var elems = items[k].elements || [];
                                for (var j = 0; j < elems.length; j++) {
                                    if (i == elems[j]) {
                                        items[k].fill != '' ? $subSvg.eq(i).css({'fill': items[k].fill}) : $subSvg.eq(i).css({'fill': 'none'});
                                    }
                                }
                            }
                        });
                    }
                } else {
                    var fillArray = [];
                    var fillObj = {};
                    $.each($subSvg, function (i, n) {
                        var styleCss = $(n).attr('style');
                        if (styleCss) {
                            var styleCssVal = styleCss.split(';') || [];
                            for (var j = 0, valLen = styleCssVal.length; j < valLen; j++) {
                                if (styleCssVal[j].includes('fill:')) {
                                    fillArray.push(styleCssVal[j].split(':')[1]);
                                    break;
                                }
                            }
                        } else {
                            fillArray.push($(n).attr('fill'));
                        }
                    });

                    for (var k = 0; k < fillArray.length; k++) {
                        if (!fillObj[fillArray[k]]) {
                            fillObj[fillArray[k]] = 1;
                            fillArray[k] != 'none' ? items.push({
                                fill: fillArray[k],
                                svgFill: fillArray[k]
                            }) : items.push({fill: '', svgFill: 'none'});
                        }
                    }
                    for (var m = 0; m < items.length; m++) {
                        var elements = [];
                        $.each($subSvg, function (i, ele) {
                            var styleCss = $(ele).attr('style');
                            var fillColor;
                            if (styleCss) {
                                var styleCssVal = styleCss.split(';');
                                for (var j = 0, valLen = styleCssVal.length; j < valLen; j++) {
                                    if (styleCssVal[j].includes('fill:')) {
                                        fillColor = styleCssVal[j].split(':')[1];
                                        break;
                                    }
                                }
                            } else {
                                fillColor = $(ele).attr('fill');
                            }
                            if (fillColor == items[m].svgFill) {
                                elements.push(i);
                            }
                        });
                        items[m].elements = elements;
                    }
                    elementJson.properties.items = items;
                }
                var viewBoxVal = '0 0 ' + svgWidth + ' ' + svgHeight;
                var p = element.parentNode;
                p.removeChild(element);
                element = svg[0];
                p.appendChild(element);
                element.setAttribute('viewBox', viewBoxVal);
                element.setAttribute('preserveAspectRatio', 'none');
                element.setAttribute('width', '100%');
                element.setAttribute('height', '100%');
                element.id = id;
                element.setAttribute('class', 'element svg-element');
            });
        return $(element);
    }

    getSvg(src) {
        var host = 'http://res1.eqh5.com/';
        if (!src.includes('http')) src = host + src;
        return $.ajax({
            type: 'GET',
            url: src,
            dataType: 'xml'
        });
    }
}
module.exports = LinShape;