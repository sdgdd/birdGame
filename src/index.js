require('../public/style/bird.css');
const { Sky } = require('./sky')
const { Land } = require('./land')
const { Bird } = require('./bird')

const mysky = new Sky(-10, 0);
const land = new Land(-15);
const bird = new Bird(0, 0.5);
const times = 100


document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        bird.jump()
    }
})

addEventListener('click', function() {
    bird.jump()
});


setInterval(() => {
    bird.startSwing()
    bird.move(timeTranst(times))
    mysky.move(timeTranst(times));
    land.move(timeTranst(times));
}, times);

function timeTranst(time) {
    return time / 100
}