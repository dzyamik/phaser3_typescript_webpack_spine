import 'phaser'
import { ASSETS } from '../assets'
import { EventsList } from '../constants/events'
import { CommonUtils } from '../utils/CommonUtils'
import { CommunicationService } from '../utils/CommunicationService'
import loader from '../utils/loader'

export default class Loader extends Phaser.Scene {
    elementsContainer: Phaser.GameObjects.Container
    background: Phaser.GameObjects.Image
    progress: number

    constructor() {
        super('Loader')
    }

    // Add background, loaded in Preloading scene
    init() {
        this.elementsContainer = this.add.container(0, 0)
        this.background = this.add.image(0, 0, 'backgroundPreloader').setOrigin(0)
    }

    preload() {
        this.load.on('progress', (value) => {
            console.log(`Progress: ${Math.round(value * 100)} %`)
            this.progress = value
        })

        this.load.on('fileprogress', (file) => {
            console.log(`Loading asset: ${file.key}`)
        })

        this.load.on('complete', () => {
            console.log('Loading completed!')
        })

        // Images
        loader(this, 'loading', ASSETS)
    }

    create() {
        // Start game scene
        if (CommunicationService.gameData) {
            CommonUtils.emitter.emit(EventsList.gameOpening)
            // this.scene.start('Game')
        } else {
            CommonUtils.emitter.once(EventsList.setData, () => {
                CommonUtils.emitter.emit(EventsList.gameOpening)
                // this.scene.start('Game')
            })
        }
    }
}
