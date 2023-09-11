export class Scenes {
    constructor() {
        this.currentScene = 'start';
        this.sceneStaut = ['start', 'playing', 'over'];
    }

    changeScene(scene) {
        if (!this.sceneStaut.includes(scene)) {
            throw ('scene is illegal value')
        }
        this.currentScene = scene;
        this.render();
    }
    render() {
        const maskDom = document.querySelector('.mask');
        maskDom.className = `mask_${this.currentScene} mask`
    }
}