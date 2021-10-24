import 'phaser'
import { IBackground, IUI } from '../constants/interfaces'
import { Background } from './components/Background'
import { UI } from './components/UI'

export default class Game extends Phaser.Scene {
    private canInteract: boolean = true
    // private background: Phaser.GameObjects.Image

    backgroundContainer: IBackground
    uiContainer: IUI

    constructor() {
        super('Game')
    }

    preload() {}

    create() {
        // Add Background

        this.backgroundContainer = new Background(this, 0, 0)
        this.uiContainer = new UI(this, 0, 0)

        this.createFunctionsBind()
    }

    createFunctionsBind(): void {}
}
