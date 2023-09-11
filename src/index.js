require('../public/style/bird.css');
// const { Sky } = require('./base/sky')
// const { Land } = require('./base/land')
// const { Bird } = require('./base/bird')
// const {ProductPipePair} = require('./base/pipe');
// const {setIntervalAnimal}= require('./until');
// const {Scenes} = require('./control/scence')

// // function init(){
//     const mysky = new Sky(-10, 0);
//     const land = new Land(-15);
//     const bird = new Bird(0, 1);
//     const pipe = new ProductPipePair(10);
//     pipe.genteratePipePair()
//     const times = 100;
//     bird.startSwing()
//     setIntervalAnimal(animal,80);
//     const secne =new Scenes()
// // }

// document.querySelector('.mask').addEventListener('click',(e)=>{
//     e.preventDefault();
//     e.stopPropagation();
//     secne.changeScene('playing');
// })


// document.addEventListener('keydown', (event) => {
//     if (event.code === 'Space') {
//         bird.jump()
//     }
// })

// addEventListener('click', function () {
//     bird.jump()
// });


// function animal() {
//         pipe.move(-0.5);
//         bird.move(timeTranst(times))
//         mysky.move(timeTranst(times));
//         land.move(timeTranst(times));
// }



// function timeTranst(time) {
//     return time / 100
// }


const {Game} = require('./control/game');

const game = new Game();
game.init();