import { Rectangle } from './rectangle'
import { randomRange, setIntervalAnimal } from '../until'

const { domTop: landTop } = Rectangle.getDomStyle('.land');

/**两个管道之间的间隙 */
const sapce = 100;

/**下方管道最小高度 */
const donwnMinHeight = 20;

/**两个管道的总高度 */
const pipePairMaxHeight = landTop - sapce - donwnMinHeight;

/** 单个管道的最大高度*/
const pipeMinHeight = 70

/**
 * 生成管道页面dom元素
 * @param {string} direction 方向
 * @returns {Element} 生成的管道dom元素
 */
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

    /**
     * 创建一个管道
     * @param {string} direction 管道方向
     * @param {number} height 管道高度
     * @param {number} speed 管道横向移动速度
     */
    constructor(direction = 'up', height, speed) {
        const pipeDom = genterateImgDom(direction);
        const { domLeft, domTop } = Rectangle.getDomStyle(pipeDom);
        super(52, height, domLeft, undefined, speed, 0, pipeDom);
    }

    /**
     * 销毁页面元素
     */
    destory() {
        this.dom.remove()
    }
}

export class PipePair {
    /**
     * 创建上下一对管道
     * @param {number} speed 管道对横向移动速度
     */
    constructor(speed) {
        this.space = sapce;
        this.pipePairMaxHeight = pipePairMaxHeight;
        const pipeUpHeight = randomRange(pipeMinHeight, pipePairMaxHeight);
        this.pipeDownHeight = pipePairMaxHeight - pipeUpHeight + donwnMinHeight;
        this.pipeUpIns = new Pipe('up', pipeUpHeight, speed);
        this.pipeDownIns = new Pipe('down', this.pipeDownHeight, speed);
    }

    /**
     * 
     * @param {number} duration 距上次移动间隔的时间
     */
    move(duration) {
        this.pipeDownIns.move(duration);
        this.pipeUpIns.move(duration);
    }



    /**
     * 判断是否还在使用该对象，没有使用就销毁
     * @returns {boolean} 是否还在使用管道对
     */
    isUsing() {
        const flag = !(parseInt(getComputedStyle(this.pipeDownIns.dom).left) < -this.pipeDownIns.width)
        if (!flag) {
            this.destory()
        }
        return flag
    }

    /**
     * 销毁管道对
     */
    destory() {
        this.pipeDownIns.destory()
        this.pipeUpIns.destory()
    }
}


export class ProductPipePair {
    /**
     * 管道对管理类
     * @param {number} speed 管道移动速度
     * @param {number} pipeGenterateDuraton 生成管道对的时间间隔
     */
    constructor(speed, pipeGenterateDuraton = 4000) {
        this.speen = speed;
        this.pipeGenterateDuraton = pipeGenterateDuraton;
        this.timer = null;
        /** 管道对实例管理列表 */
        this.managerIns = [];
    }

    /**
     * 定时生成管道对
     */
    genteratePipePair() {
        this.timer = setIntervalAnimal(() => {
            this.managerIns = this.managerIns.filter((ins) => ins.isUsing());
            this.managerIns.push(new PipePair(this.speen));
        }, this.pipeGenterateDuraton);
        return this.timer;
    }

    /**
     * 停止产生管道对
     */
    stopGenterate() {
        this.timer.stop();
    }

    /**
     * 恢复生产管道对
     */
    reStartGenterate() {
        this.timer.start()
    }

    /**
     * 获取管理的所有的管道dom元素
     */
    getProductedPipeDom() {
        let result = []
        this.managerIns.forEach((ins) => {
            result.push(
                ins.pipeUpIns.dom,
                ins.pipeDownIns.dom
            )
        })
        return result
    }

    /**
     * 销毁对象
     */
    destory() {
        this.timer.destory();
        this.this.managerIns.forEach((ins) => {
            ins.destory();
        })
    }

    /**
     * 
     * @param {number} duration 管理的所有管道对实例距上次移动的时间间隔
     */
    move(duration) {
        this.managerIns.forEach((ins) => {
            ins.move(duration);
        })
    }
}