class PageScroll {
    constructor(linScene) {
        this.$ele = linScene.$ele;
        this.moveDistanceX = null;
        this.moveDistanceY = null;
        this.activePage = null;
        this.pageList = linScene.pageList;
        this.currentPage = linScene.currentPage || linScene.pageList[0];
        this.bindEventListeners();
    }
    bindEventListeners () {
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

    scrollStart (e) {
        this.moveDistanceX = 0;
        this.moveDistanceY = 0;
        var coord = this.getCoord(e);
        if (coord) {
            this.startX = coord.x;
            this.startY = coord.y;
        }
    }

    scrollMove (e) {
        var coord = this.getCoord(e);
        if (coord) {
            this.moveDistanceX = coord.x - this.startX;
            this.moveDistanceY = coord.y - this.startY;
        }
    }

    scrollEnd (e) {
        if(this.moveDistanceX < -20) {
            this.activePage = this.getCurAndActive(true);
            this.currentPage.hide();
            this.activePage.show();
            this.currentPage = this.activePage;
        }
        if(this.moveDistanceX > 20){
            this.activePage = this.getCurAndActive();
            this.currentPage.hide();
            this.activePage.show();
            this.currentPage = this.activePage;
        }
        if(this.moveDistanceY < -20) {
            this.activePage = this.getCurAndActive(true);
            this.currentPage.hide();
            this.activePage.show();
            this.currentPage = this.activePage;
        }
        if(this.moveDistanceY > 20){
            this.activePage = this.getCurAndActive();
            this.currentPage.hide();
            this.activePage.show();
            this.currentPage = this.activePage;
        }

    }

    getCoord (e) {
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
        var currentIndex = this.pageList.indexOf(this.currentPage);
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
}

module.exports = PageScroll;