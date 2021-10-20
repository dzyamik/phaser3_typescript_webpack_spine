import 'phaser'

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader')
    }

    preload() {
        this.load.image('backgroundPreloader', '../../assets/images/mainBG.jpg')
    }

    create() {
        console.log('Preloading completed!')
        this.scene.start('Loader')
    }
}
