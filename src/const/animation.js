var ANIMATION_TYPE = {
    0: ["fadeIn"],
    1: ["fadeInLeft", "fadeInDown", "fadeInRight", "fadeInUp"],
    2: ["bounceInLeft", "bounceInDown", "bounceInRight", "bounceInUp"],
    3: ["bounceIn"],
    4: ["zoomIn"],
    5: ["rubberBand"],
    6: ["wobble"],
    7: ["rotateIn"],
    8: ["flip"],
    9: ["swing"],
    10: ["fadeOut"],
    11: ["flipOutY"],
    12: ["rollInRight", "rollInDown", "rollInLeft", "rollInUp"],
    13: ["lightSpeedInRight", "lightSpeedInDown", "lightSpeedInLeft", "lightSpeedInUp"],
    14: ["bounceOut"],
    15: ["rollOutRight", "rollOutDown", "rollOutLeft", "rollOutUp"],
    16: ["lightSpeedOutRight", "lightSpeedOutDown", "lightSpeedOutLeft", "lightSpeedOutUp"],
    17: ["fadeOutRight", "fadeOutDown", "fadeOutLeft", "fadeOutUp"],
    18: ["zoomOut"],
    19: ["bounceOutRight", "bounceOutDown", "bounceOutLeft", "bounceOutUp"],
    20: ["flipInY"],
    21: ["tada"],
    22: ["jello"],
    23: ["flash"],
    24: ["flipInX"],
    25: ["flipOutX"],
    26: ["twisterInDownRight", "twisterInDownDown", "twisterInDownLeft", "twisterInDownUp"],
    27: ["puffIn"],
    28: ["puffOut"],
    29: ["slideDown"],
    30: ["slideUp"],
    31: ["twisterInUpRight", "twisterInUpDown", "twisterInUpLeft", "twisterInUpUp"],
    32: ["hingeRight", "hingeLeft"],
    particles: ["particles"],
    typer: ["typer"]
};

function startAnimation(linElement, config) {
    var maxCount = null;
    var {$box1Div, $box2Div, $context, elementJson} = linElement;
    var animArr = elementJson.properties.anim || [];

    var index = -1;

    doAnimation();

    function doAnimation() {
        index++;
        if (index >= animArr.length) {
        } else {
            var {type, direction, duration = 0.1, linear, count, countNum = 1, delay = 0} = animArr[index];

            var timingFn = linear ? 'linear' : 'ease';
            var animType = ANIMATION_TYPE[type];

            if (!animType) {
                return doAnimation();
            }

            var animName = animType[direction] || ANIMATION_TYPE[type][0];
            var iterationCount = count ? 'infinite' : countNum;

            if (maxCount) {
                iterationCount = 1;
            }

            $box2Div.css({
                'animation-name': '',
                'animation-duration': '',
                'animation-timing-function': '',
                'animation-delay': '',
                'animation-iteration-count': ''
            });

            var animObj = {
                'animation-name': animName,
                'animation-duration': duration + 's',
                'animation-timing-function': timingFn,
                'animation-delay': delay + 's',
                'animation-iteration-count': iterationCount,
                'animation-direction': 'normal',
                'animation-fill-mode': 'both',
                // 'animation-play-state': 'running'
            };

            var animStr = Object.keys(animObj).map(key => animObj[key]).join(' ');
            $box2Div.css('animation', animStr);
            $box2Div.one('webkitAnimationEnd ' +
                'mozAnimationEnd ' +
                'MSAnimationEnd ' +
                'oanimationend ' +
                'animationend', function() {
                index < animArr.length - 1 && $box2Div.css({
                    'animation-name': '',
                    'animation-duration': '',
                    'animation-timing-function': '',
                    'animation-delay': '',
                    'animation-iteration-count': ''
                });
                setTimeout(function() {
                    doAnimation();
                }, 0);
            });
        }
    }
}

module.exports = {
    ANIMATION_TYPE, startAnimation
}
