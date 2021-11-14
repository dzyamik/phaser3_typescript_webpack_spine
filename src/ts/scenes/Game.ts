import 'phaser'
import { IBackground, IMessages, IReelManager, IUI } from '../constants/interfaces'
import { Background } from './components/Background'
import { Messages } from './components/Messages'
import { ReelManager } from './components/ReelManager'
import { UI } from './components/UI'

export default class Game extends Phaser.Scene {
    private backgroundContainer: IBackground
    private reelManagerContainer: IReelManager
    private uiContainer: IUI
    private messagesContainer: IMessages

    constructor() {
        super('Game')
    }

    preload() {}

    create() {
        // Add Background
        this.backgroundContainer = new Background(this, 0, 0)
        // Add container for reels and symbols
        this.reelManagerContainer = new ReelManager(this, 0, 0)
        // Add contianer for UI Elements
        this.uiContainer = new UI(this, 0, 0)
        // Add container for messages
        this.messagesContainer = new Messages(this, 0, 0)

        this.createFunctionsBind()

        // Remove unused scenes
        this.scene.remove('Preloader')
        this.scene.remove('Loader')
    }

    createFunctionsBind(): void {}
}
