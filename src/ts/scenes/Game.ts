import 'phaser'
import { IBackground } from '../constants/interfaces'
import { Background } from './components/Background'

export default class Game extends Phaser.Scene {
    private canInteract: boolean = true
    // private background: Phaser.GameObjects.Image

    backgroundContainer: IBackground

    constructor() {
        super('Game')
    }

    preload() {}

    create() {
        // Add Background

        this.backgroundContainer = new Background(this, 0, 0)

        this.createFunctionsBind()
    }

    createFunctionsBind(): void {}
}
