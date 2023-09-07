import { Rectangle } from './rectangle'

const { domHeight, domWidth, dom, domStyle } = Rectangle.getDomStyle('.land');
const landTop = domStyle.top

export class Land extends Rectangle {
    constructor(xSpeed, ySpeed) {
        super(domWidth, domHeight, 0, landTop, xSpeed, ySpeed, dom);
    }

    onMove() {
        if (this.left < -domWidth / 2) {
            this.left = 0;
        }
    }
}