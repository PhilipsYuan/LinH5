class Elements {
    constructor(page,elements) {
        this.page = page
        this.eles = elements
    }
    listEle() {
        this.eles.forEach((item, key) => {
            let num = item.type
            if (num === 4) {
                var dealImg = new createImg(item)
                dealImg.createFirstFloor(this.page)
            } else if(num === 2) {
                var dealText = new createText(item)
                dealText.createFirstFloor(this.page)
            } else if(num === 'h') {
                var dealSvg = new createSvg(item)
                dealSvg.createFirstFloor(this.page)
            }
        })
    }
}

module.exports = Elements;