import { Rectangle } from './rectangle'

const { domHeight, domWidth, dom } = Rectangle.getDomStyle('.sky');

export class Sky extends Rectangle {
    constructor(xSpeed, ySpeed) {
        super(domWidth, domHeight, 0, 0, xSpeed, ySpeed, dom);
    }

    onMove() {
        if (this.left < -domWidth / 2) {
            this.left = 0;
        }
    }
}