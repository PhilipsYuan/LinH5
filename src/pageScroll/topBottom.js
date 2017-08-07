module.exports = {
    verticalMove,
    verticalEnd
};

function verticalMove() {
    var app = this;
    var invalid = Math.abs(app.moveDistanceY) <= Math.abs(app.moveDistanceX) ||
        app.moveDistanceY == 0;

    if (invalid) return;
    //判断用户是向上还是向下拉
    if (app.moveDistanceY > 0) {
        this.activePage = app.getCurAndActive(true);
        app.getMoveInit(true, 'bottom center', 'translateY', app.windowHeight);
    } else if (app.moveDistanceY < 0) {
        //获取当前将要显示的下一页
        this.activePage = app.getCurAndActive(false);
        app.getMoveInit(false, 'top center', 'translateY', app.windowHeight);
    }
}

function verticalEnd() {
    var app = this;
    if (Math.abs(app.moveDistanceY) > Math.abs(app.moveDistanceX)
        && Math.abs(app.moveDistanceY) > 20) {
        //切换成功：设置当前页面动画
        app.setCssWhenEnd('translateY', app.moveDistanceY, app.windowHeight, app._scrollMode);

        // 页面动画运行完成后处理
        setTimeout(() => {
            this.linScene.currentPage.deActive();
            this.linScene.currentPage.hide();
            this.activePage.show();
            this.cssAnimation(this.linScene.currentPage.$pageDiv[0].style, 'Transition', 'none');
            this.currentPage = this.linScene.currentPage = this.activePage;
        }, 800);
    }
}

