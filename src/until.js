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


