require('../public/style/bird.css')

const birdDom = document.querySelector('.bird');
const fly = [
    'bg-frame_1',
    'bg-frame_2',
    'bg-frame_3',
];
let index = 0;
setInterval(() => {
    birdDom.className = fly[index++ % fly.length] + ' bird';
}, 100);