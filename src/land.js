import { Rectangle } from './rectangle'

const { domHeight, domWidth, dom ,domTop:landTop} = Rectangle.getDomStyle('.land');

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