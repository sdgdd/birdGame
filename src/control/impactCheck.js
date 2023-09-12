export class ImpactCheck {
    constructor(bird, block) {
        this.bird = bird;
        this.block = block;
    }

    check() {
        const birdDomArea = this.getDomArea(this.bird.dom)
        for (let ins of this.block.managerIns) {
            const pipeUpDomArea = this.getDomArea(ins.pipeUpIns.dom);
            const pipeDownDomArea = this.getDomArea(ins.pipeDownIns.dom);

            if (this.isOverlap(birdDomArea, pipeUpDomArea) || this.isOverlap(birdDomArea, pipeDownDomArea)) {
                return true
            }
        }
        return false
    }


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