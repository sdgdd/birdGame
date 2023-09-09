require('../public/style/bird.css');
const { Sky } = require('./sky')
const { Land } = require('./land')
const { Bird } = require('./bird')
const {MangerPipe} = require('./pipe');
const {setIntervalAnimal}= require('./until')

const mysky = new Sky(-10, 0);
const land = new Land(-15);
const bird = new Bird(0, 1);
const pipe = new MangerPipe(10);
pipe.genteratePipePair()
const times = 100


document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        bird.jump()
    }
})

addEventListener('click', function () {
    bird.jump()
});


function animal() {
        startTime = Date.now()
        bird.startSwing()
        pipe.move(-0.5);
        bird.move(timeTranst(times))
        mysky.move(timeTranst(times));
        land.move(timeTranst(times));
}

setIntervalAnimal(animal,80)

function timeTranst(time) {
    return time / 100
}