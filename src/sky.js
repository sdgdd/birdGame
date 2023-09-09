import { Rectangle } from './rectangle'

const { domHeight, domWidth, dom } = Rectangle.getDomStyle('.sky');

export class Sky extends Rectangle {
    /**
     * 创建天空实例
     * @param {number} xSpeed x轴方向速度
     * @param {number} ySpeed y轴方向速度
     */
    constructor(xSpeed, ySpeed) {
        super(domWidth, domHeight, 0, 0, xSpeed, ySpeed, dom);
    }
    /**
     * 处理移动到天空左边边界
     */
    onMove() {
        if (this.left < -domWidth / 2) {
            this.left = 0;
        }
    }
}