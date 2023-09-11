import { typeof_all } from '../until'

export class Rectangle {
    /**
     * 创建矩形实例
     * @param {number} width 矩形宽度
     * @param {number} height 矩形高度
     * @param {number} left 矩形左坐标
     * @param {number} top 矩形顶部坐标
     * @param {number} xSpeed 矩形x轴移动速度
     * @param {number} ySpeed 矩形y轴移动速度
     * @param {number} dom 映射的dom
     */
    constructor(width, height, left, top, xSpeed, ySpeed, dom) {
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.dom = dom
    }

/**
 * @typedef {object} ComputStly 计算dom的属性
 * @property {number} domWidth dom元素宽度
 * @property {number} domHeight dom元素高度
 * @property {number} domTop dom元素top值
 * @property {number} domLeft dom元素left值
 * @property {Element} dom dom元素
 * @property {object} domStyle 计算后的dom属性值
 */


/**
 * 
 * @param {string | selector} selector 选中的dom元素或者选择器
 * @returns {ComputStly} 计算后的属性值
 */
    static getDomStyle(selector) {
        let dom = selector;
        if (typeof_all(selector) === "string") {
            dom = document.querySelector(selector);
        }
        
        const domStyle = getComputedStyle(dom);
        const domWidth = parseFloat(domStyle.width);
        const domHeight = parseFloat(domStyle.height);
        const domTop = parseFloat(domStyle.top);
        const domLeft = parseFloat(domStyle.left)
        return {
            domWidth, domHeight, domTop, domLeft, dom, domStyle
        }
    }

    /**
     * 将js计算后的属性值同步到dom元素上渲染
     */
    render() {
        const domStyle = this.dom.style;
        domStyle.width = this.width + 'px';
        domStyle.height = this.height + 'px';
        domStyle.left = this.left + 'px';
        domStyle.top = this.top + 'px';

    }

    /**
     * 移动矩形区域
     * @param {numbr} duration 距上次移动后的时间间隔
     */
    move(duration) {
        const xDis = this.xSpeed * duration;
        const yDis = this.ySpeed * duration;

        const newLeft = this.left + xDis
        const newTop = this.top + yDis

        this.left = newLeft;
        this.top = newTop;

        if (this.onMove) {
            this.onMove();
        }

        this.render();
    }
}
