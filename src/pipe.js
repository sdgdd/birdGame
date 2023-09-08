import { Rectangle } from './rectangle'
import { randomRange } from './until'

const { domTop: landTop } = Rectangle.getDomStyle('.land');
const sapce = 100;
const donwnMinHeight = 20;
const pipePairMaxHeight = landTop - sapce - donwnMinHeight;
const pipeMinHeight = 70
function genterateImgDom(direction) {
    const pipeDom = document.createElement('div');
    if (direction === 'down') {
        pipeDom.className = 'pipe_down'
    } else {
        pipeDom.className = 'pipe_up'
    };
    document.querySelector('.game').appendChild(pipeDom)
    return pipeDom
}


export class Pipe extends Rectangle {
    constructor(direction = 'up', height, speed) {
        const pipeDom = genterateImgDom(direction);
        const { domLeft, domTop } = Rectangle.getDomStyle(pipeDom);
        super(52, height, domLeft, undefined, speed, 0, pipeDom);
    }

    destory() {
        this.dom.remove()
    }
}

export class PipePair {
    constructor(speed) {
        this.space = sapce;
        this.pipePairMaxHeight = pipePairMaxHeight;
        const pipeUpHeight = randomRange(pipeMinHeight, pipePairMaxHeight);
        this.pipeDownHeight = pipePairMaxHeight - pipeUpHeight + donwnMinHeight;
        this.pipeUpIns = new Pipe('up', pipeUpHeight, speed);
        this.pipeDownIns = new Pipe('down', this.pipeDownHeight, speed);
    }

    move(duration) {
        this.pipeDownIns.move(duration);
        this.pipeUpIns.move(duration);
    }

    isUsing() {
        const flag = !(parseInt(getComputedStyle(this.pipeDownIns.dom).left) < -this.pipeDownIns.width)
        if (!flag) {
            this.destory()
        }
        return flag
    }

    destory() {
        this.pipeDownIns.destory()
        this.pipeUpIns.destory()
    }
}


export class MangerPipe {
    constructor(speed) {
        this.speen = speed
        this.managerIns = [];
    }

    genteratePipePair() {
        setInterval(() => {
            this.managerIns.filter((ins) => ins.isUsing())
            this.managerIns.push(new PipePair(this.speen));
        }, 4000)
    }

    move(duration) {
        this.managerIns.forEach((ins) => {
            ins.move(duration);
        })
    }
}