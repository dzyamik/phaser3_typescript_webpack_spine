import 'phaser'
import { EventsList } from '../constants/events'
import { IBackground, IMessages, IReelManager, IUI } from '../constants/interfaces'
import { CommonUtils } from '../utils/CommonUtils'
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
        CommonUtils.emitter.emit(EventsList.gameOpened)
    }

    createFunctionsBind(): void {
        CommonUtils.emitter.once(EventsList.setState, () => {
            CommonUtils.emitter.emit(EventsList.idle)
        })
    }
}
