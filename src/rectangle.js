import { typeof_all } from './until'

export class Rectangle {
    constructor(width, height, left, top, xSpeed, ySpeed, dom) {
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.dom = dom
    }


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

    render() {
        const domStyle = this.dom.style;
        domStyle.width = this.width + 'px';
        domStyle.height = this.height + 'px';
        domStyle.left = this.left + 'px';
        domStyle.top = this.top + 'px';

    }

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
