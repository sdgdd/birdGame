import { Rectangle } from './rectangle'

const { domHeight, domWidth, dom, domStyle ,domLeft,domTop} = Rectangle.getDomStyle('.bird');
const { domHeight: gameHeight } = Rectangle.getDomStyle('.game');
const { domHeight: landHeight,domTop:landTop} = Rectangle.getDomStyle('.land');

export class Bird extends Rectangle {
    constructor() {
        super(domWidth, domHeight, domLeft, domTop, 0, 1, dom);
        this.g = 9.8;
        this.maxY =landTop - domHeight
        this.swingStatus = 0;
        this.swingStatusMap = [
            'bg-frame_1',
            'bg-frame_2',
            'bg-frame_3',
        ];
        this.timer = null;
    }

    startSwing() {
        if (this.timer) return null;
        this.timer = setInterval(() => {
            this.swingStatus = (this.swingStatus + 1) % this.swingStatusMap.length;
            this.render();
        }, 50)
    }

    stopSwing() {
        clearInterval(this.timer);
        this.timer = null;
    }

    render(){
        super.render();
        this.dom.className = this.swingStatusMap[this.swingStatus] + ' bird';
    }

    jump() {
        this.ySpeed = -30
    }

    move(duration) {
        this.ySpeed += this.g * duration;
        super.move(duration)
    }

    onMove() {
        if (this.top < 0) {
            this.top = 0
        } else if (this.top >= this.maxY) {
            this.top = this.maxY
            this.stopSwing();
        };
    }
}