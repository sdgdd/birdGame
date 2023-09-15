require('../../public/style/bird.css');
const { Sky } = require('../base/sky')
const { Land } = require('../base/land')
const { Bird } = require('../base/bird')
const { ProductPipePair } = require('../base/pipe');
const { setIntervalAnimal } = require('../until');
const { Scenes } = require('./scence');
const { ImpactCheck } = require('./impactCheck')

export class Game {
    constructor() {
        this.sky = new Sky(-10, 0);
        this.land = new Land(-15);
        this.bird = new Bird(2);
        this.pipe = new ProductPipePair(-10);
        this.scene = new Scenes();
        this.commonDruation = 100;
        this.timers = [];
        this.isInvincible = true
        this.xspeed = 600;
    }

    /**
     * 初始化游戏角色
     */
    init() {
        this.impactCheck = new ImpactCheck(this.bird, this.pipe);
        this.scene.changeScene('start');
        this.timers.push(setIntervalAnimal.call(this, this.backgroundAnimal, 80));
        this.timers.push(setIntervalAnimal(() => {
            if (this.impactCheck.check() && this.isInvincible) {
                this.bird.lifeVal--;
                this.birdInvincibleStatus(4000)
            }
            this.bird.move(0.5);
            if (this.bird.lifeVal <= 0) {
                this.bird.stopInvincible();
                this.over();
            }
        }, 80))
        this.timers.push(this.pipe.genteratePipePair());
        this.addOptrEven();
    }

    /**
     * 设置小鸟无敌状态
     * @param {number} duration 无敌状态的持续时间
     */
    birdInvincibleStatus(duration){
        this.isInvincible = false;
        this.bird.startInvincible();
        setTimeout(()=>{
            this.isInvincible = true;
            this.bird.stopInvincible();
        },duration)
    }


    /**
     *  重置小鸟状态
     */
    reset() {
        this.bird.reset();
        this.scene.changeScene('start');
        this.stop();
    }

    /**
     * 开始游戏
     */
    start() {
        this.scene.changeScene('playing');
        this.bird.startSwing();
        this.timers.forEach((timer) => {
            timer.start()
        })
    }
    /**
     * 停止游戏
     */
    stop() {
        this.scene.changeScene('start');
        this.bird.stopSwing();
        this.timers.forEach((timer) => {
            timer.stop()
        })
    }
    /**
     * 结束游戏
     */
    over() {
        this.scene.changeScene('over');
        this.timers.forEach((timer) => {
            timer.stop()
        })
    }
    /**
     * 背景动画
     */
    backgroundAnimal() {
        this.pipe.move(this.timeTranst(this.xspeed));
        this.sky.move(this.timeTranst(this.xspeed));
        this.land.move(this.timeTranst(this.xspeed));
    }
    timeTranst(time) {
        return time / 1000
    }
    /**
     * 加入键盘点击操作事件
     */
    addOptrEven() {
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                this.bird.jump()
            }

            if (event.code === 'Enter') {
                this.stop()
            }
        })

        document.addEventListener('click', () => {
            this.bird.jump()
        });

        document.querySelector('.mask').addEventListener('click', (e) => {
            e.stopPropagation();
            const className = e.currentTarget.className
            if (className.includes('mask_start')) {
                this.start();
            } else if (className.includes('mask_over')) {
                this.reset()
            }

        })

    }

}





