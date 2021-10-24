import 'phaser'
import { IBackground, IUI } from '../constants/interfaces'
import { Background } from './components/Background'
import { UI } from './components/UI'

export default class Game extends Phaser.Scene {
    private backgroundContainer: IBackground
    private uiContainer: IUI

    constructor() {
        super('Game')
    }

    preload() {}

    create() {
        // Add Background
        this.backgroundContainer = new Background(this, 0, 0)
        // Add contianer for UI Elements
        this.uiContainer = new UI(this, 0, 0)

        this.createFunctionsBind()

        // Remove unused scenes
        this.scene.remove('Preloader')
        this.scene.remove('Loader')
    }

    createFunctionsBind(): void {}
}
