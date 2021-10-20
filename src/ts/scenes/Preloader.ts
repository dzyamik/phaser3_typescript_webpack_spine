import 'phaser'
import { ASSETS } from '../assets'
import loader from '../utils/loader'

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader')
    }

    preload() {
        // this.load.image('backgroundPreloader', '../../assets/images/mainBG.jpg')
        loader(this, 'preloading', ASSETS)
    }

    create() {
        console.log('Preloading completed!')
        this.scene.start('Loader')
    }
}
