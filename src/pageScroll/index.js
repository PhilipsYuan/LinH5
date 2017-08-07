var verticalMove = require('./topBottom').verticalMove;
var verticalEnd = require('./topBottom').verticalEnd;

class PageScroll {
    constructor(linScene) {
        this.linScene = linScene;
        this.$ele = linScene.$ele;
        this.moveDistanceX = null;
        this.moveDistanceY = null;
        this.activePage = null;
        this.pageList = linScene.pageList;
        this.currentPage = linScene.currentPage = linScene.currentPage || linScene.pageList[0];
        this.doScrollMoveFn = verticalMove.bind(this);
        this.doScrollEndFn = verticalEnd.bind(this);
        this.windowHeight = window.innerHeight;
        this.animTime = 0.4;
        this.bindEventListeners();
    }

    bindEventListeners() {
        var touchStart = false;
        this.$ele
            .on('mousedown touchstart', (e) => {
                touchStart = true;
                this.scrollStart(e);
            })
            .on('mousemove touchmove', (e) => {
                if (touchStart) {
                    this.scrollMove(e);
                }
            })
            .on('mouseup touchend mouseleave', (e) => {
                this.scrollEnd(e);
                touchStart = false;
            });
    }

    scrollStart(e) {
        this.moveDistanceX = 0;
        this.moveDistanceY = 0;
        var coord = this.getCoord(e);
        if (coord) {
            this.startX = coord.x;
            this.startY = coord.y;
        }
    }

    scrollMove(e) {
        var coord = this.getCoord(e);
        if (coord) {
            this.moveDistanceX = coord.x - this.startX;
            this.moveDistanceY = coord.y - this.startY;
        }
        this.doScrollMoveFn();
    }

    scrollEnd(e) {
        this.doScrollEndFn();
    }

    getCoord(e) {
        if (e && e.type.includes('mouse')) {
            return {
                x: e.pageX - this.left,
                y: e.pageY - this.top
            };
        }
        if (e && e.type.includes('touch')) {
            return {
                x: (e.touches ? e.touches[0].pageX : e.originalEvent.touches[0].pageX),
                y: (e.touches ? e.touches[0].pageY : e.originalEvent.touches[0].pageY)
            };
        }
    }

    getCurAndActive(prePage) {
        var activePage = null;
        var currentIndex = this.pageList.indexOf(this.linScene.currentPage);
        var lastIndex = this.pageList.length - 1;
        // 取上一页
        if (prePage) {
            if (currentIndex > 0) {
                activePage = this.pageList[currentIndex - 1];
            } else {
                activePage = this.pageList[lastIndex];
            }
        } else {
            // 取下一页
            if (currentIndex < lastIndex) {
                activePage = this.pageList[currentIndex + 1];
            } else {
                activePage = this.pageList[0];
            }
        }
        return activePage;
    }

    getMoveInit(positive, transOrign, translateDir, windowShape) {
        var activePage = this.activePage;
        if (activePage && activePage.$pageDiv[0]) {
            activePage.active();
            var operator = positive ? '-' : '';
            activePage.$pageDiv[0].style.webkitTransition = 'none';
            activePage.$pageDiv[0].style.mozTransition = 'none';
            activePage.$pageDiv[0].style.transition = 'none';

            activePage.$pageDiv[0].style.webkitTransform = translateDir + '(' + operator + windowShape + 'px)';
            activePage.$pageDiv[0].style.mozTransform = translateDir + '(' + operator + windowShape + 'px)';
            activePage.$pageDiv[0].style.transform = translateDir + '(' + operator + windowShape + 'px)';

            if (transOrign) {
                // this.cssAnim($(this.linScene.currentPage.$pageDiv[0]), 'transform-origin', transOrign);
            }
        } else {
            this.cssAnimation(this.linScene.currentPage.$pageDiv[0].style, 'Transform', translateDir + '(0px) scale(1)');
        }
    }

    setCssWhenMove(positive, translateDir, windowShape, moveDistance, scrollMode) {
        if (this.activePage) {
            var operator = positive ? '-' : '';
            this.cssAnim($(this.activePage.$pageDiv[0]), 'transform', translateDir + '(' + operator + (windowShape - Math.abs(moveDistance)) + 'px)');
        }
    }

    setCssWhenEnd (translateDir) {
        this.setTransition(this.linScene.currentPage.$pageDiv[0], this.animTime, 'linear');
        this.setTransition(this.activePage.$pageDiv[0], this.animTime, 'linear');
        this.cssAnim($(this.linScene.currentPage.$pageDiv[0]), 'transform', 'scale(1)');
        this.cssAnim($(this.activePage.$pageDiv[0]), 'transform', translateDir + '(0px)');
    }

    setTransition(dom, duration, func) {
        dom.style.webkitTransition = '-webkit-transform ' + duration + 's ' + func;
        dom.style.mozTransition = '-moz-transform ' + duration + 's ' + func;
        dom.style.transition = 'transform ' + duration + 's ' + func;
    }

    cssAnim(animObj, animName, animValue) {
        var prefix = ['', '-webkit-', '-moz-'];
        for (var i = 0; i < prefix.length; i++) {
            animObj.css(prefix[i] + animName, animValue);
        }
    }

    cssAnimation(animObj, animName, animValue) {
        var prefix = ['', 'webkit', 'moz'];
        for (var i = 0, len = prefix.length; i < len; i++) {
            if (i == 0) {
                animName = animName.substring(0, 1).toLowerCase() + animName.substring(1, animName.length);
            }
            var value = animValue instanceof Array ? animValue[i] : animValue;
            var name = prefix[i] + animName;
            animObj[name] = value;
        }
    }
}

module.exports = PageScroll;