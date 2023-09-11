/**
 * 判断所有的数据类型
 * @param {*} 需要判断的变量
 * @returns {string} 变量类型
 */
export function typeof_all(val) {
    return Object.prototype.toString.call(val).replace(/\[object (\w+)\]/, (match, data) => data).toLowerCase()
}

/**
 * 生成一个范围内的随机数
 * @param {number} 范围的下限
 * @param {number} 范围的上限
 * @returns {number} 生成的随机数
 */
export function randomRange(min, max) {
    const range = max - min;
    const randomFloat = Math.random() * range + min;
    return parseFloat(randomFloat.toFixed(1));
}

/**
 * 通过动画回调函数实现定时器
 * @param { function } callback 需要执行的回调函数
 * @param { number } duration 时间间隔
 */
export function setIntervalAnimal(callback, duration = 0) {
    let clearId = null;
    let stratTime = 0;
    let done = false;
    let that = this
    function fn(DOMHighResTimeStamp) {
        if ((DOMHighResTimeStamp - stratTime >= duration) && done) {
            stratTime = DOMHighResTimeStamp;
            callback.call(that);
        }
        clearId = window.requestAnimationFrame(fn);
    }
    window.requestAnimationFrame(fn);
    return {
        stop: () => {
            done = false
        },
        destory: () => {
            window.cancelAnimationFrame(clearId)
        },
        start: () => {
            done = true
        }
    }
}

