import 'phaser'
import { ASSETS } from '../assets'
import { EventsList } from '../constants/events'
import { CommonUtils } from '../utils/CommonUtils'
import loader from '../utils/loader'

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader')
    }

    init() {
        CommonUtils.emitter.emit(EventsList.toPreloading)
    }

    preload() {
        loader(this, 'preloading', ASSETS)
    }

    create() {
        CommonUtils.emitter.emit(EventsList.toLoading)
        console.log('Preloading completed!')
        // this.scene.start('Loader')
    }
}
