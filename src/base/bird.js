import { Rectangle } from './rectangle'

const { domHeight, domWidth, dom, domStyle, domLeft, domTop } = Rectangle.getDomStyle('.bird');
const { domTop: landTop } = Rectangle.getDomStyle('.land');

export class Bird extends Rectangle {
    /**
     * 创建小鸟实例
     */
    constructor(lifeVal = 1) {
        super(domWidth, domHeight, domLeft, domTop, 0, 1, dom);

        /** 加速度 */
        this.g = 9.8;
        this.initTop = domTop;
        this.initSpeed = 1;
        this.lifeVal = lifeVal
        /** 小鸟落地高度 */
        this.maxY = landTop - domHeight
        this.swingStatus = 0;
        this.swingStatusMap = [
            'bg-frame_1',
            'bg-frame_2',
            'bg-frame_3',
        ];
        this.timer = null;
    }

    /** 开启翅膀扇动 */
    startSwing() {
        if (this.timer) return null;
        this.timer = setInterval(() => {
            this.swingStatus = (this.swingStatus + 1) % this.swingStatusMap.length;
            this.render();
        }, 50)
    }
    /** 停止翅膀扇动 */
    stopSwing() {
        clearInterval(this.timer);
        this.timer = null;
    }


    startInvincible(){
        this.dom.classList.add("invincible")
    }

    stopInvincible(){
        this.dom.classList.remove("invincible")
    }

    render() {
        super.render();
        const statusMapLength =  this.swingStatusMap.length
        this.dom.classList.remove(this.swingStatusMap[(this.swingStatus+statusMapLength-1)%statusMapLength]);
        this.dom.classList.add(this.swingStatusMap[this.swingStatus])
    }

    /** 小鸟向上你跳跃*/
    jump() {
        this.ySpeed = -30
    }

    reset() {
        this.top = this.initTop;
        this.ySpeed = this.initSpeed;
        this.lifeVal = 1;
    }

    /** 
     * 更新小鸟位置信息
     * @param {number} duration 距上次移动的时间间隔
     */
    move(duration) {
        this.ySpeed += this.g * duration;
        super.move(duration)
    }

    /** 小鸟位置更新后的边界判断处理*/
    onMove() {
        if (this.top < 0) {
            this.top = 0
        } else if (this.top >= this.maxY) {
            this.top = this.maxY
            this.stopSwing();
            this.lifeVal--;
        };
    }
}