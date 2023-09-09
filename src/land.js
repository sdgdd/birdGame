import { Rectangle } from './rectangle'

const { domHeight, domWidth, dom ,domTop:landTop} = Rectangle.getDomStyle('.land');

export class Land extends Rectangle {
    /**
     * 创建地面实例
     * @param {number} xSpeed x方向速度
     * @param {number} ySpeed y方向速度
     */
    constructor(xSpeed, ySpeed) {
        super(domWidth, domHeight, 0, landTop, xSpeed, ySpeed, dom);
    }

    /**
     * 地面移动边到界复原处理
     */
    onMove() {
        if (this.left < -domWidth / 2) {
            this.left = 0;
        }
    }
}