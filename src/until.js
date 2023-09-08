export function typeof_all(val) {
    return Object.prototype.toString.call(val).replace(/\[object (\w+)\]/, (match, data) => data).toLowerCase()
}

export function randomRange(min, max) {
    const range = max - min;
    const randomFloat = Math.random() * range + min;
    return parseFloat(randomFloat.toFixed(1));
}