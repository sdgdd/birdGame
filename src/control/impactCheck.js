export class ImpactCheck {
    constructor(bird, block) {
        this.bird = bird;
        this.block = block;
    }

    /**
     *  检测检测
     * @returns 
     */
    check() {
        const birdDomArea = this.getDomArea(this.bird.dom)
        for(let pipeDom of this.block.getProductedPipeDom()){
            const pipeArea = this.getDomArea(pipeDom)
            if (this.isOverlap(birdDomArea, pipeArea)) {
                return true
            }
        }
        return false
    }

    /**
     * 获取dom元素的区域的四个角坐标
     * @param {Element} dom 
     * @returns {object} 上下左右的的坐标值
     */
    getDomArea(dom) {
        let computedDomStyle = getComputedStyle(dom);
        let topY = parseFloat(computedDomStyle.top);
        let bottomY = topY + parseFloat(computedDomStyle.height);
        let leftX = parseFloat(computedDomStyle.left);
        let rightX = parseFloat(computedDomStyle.width) + leftX;

        return {
            topY, bottomY, leftX, rightX
        }
    }
    /**
     * 判断两个矩形区域是否重叠
     * @param {*} rectangle1 
     * @param {*} rectangle2 
     * @returns {boolean} isOverlap 是否重叠
     */
    isOverlap(rectangle1, rectangle2) {
        if (rectangle1.leftX > rectangle2.rightX ||
            rectangle1.rightX < rectangle2.leftX ||
            rectangle1.topY > rectangle2.bottomY ||
            rectangle1.bottomY < rectangle2.topY) {
            return false;
        }

        return true;
    }
}