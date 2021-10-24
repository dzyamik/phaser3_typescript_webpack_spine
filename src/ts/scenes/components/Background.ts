import 'phaser'
import { IBackground } from '../../constants/interfaces'

export class Background extends Phaser.GameObjects.Container implements IBackground {
    private mainContainer: Phaser.GameObjects.Container

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x, y)
        this.createElements()
    }

    private createElements(): void {
        this.mainContainer = this.scene.add.container(0, 0)
        const WIDTH = this.scene.sys.canvas.width
        const HEIGHT = this.scene.sys.canvas.height

        const background = this.scene.add.image(WIDTH / 2, HEIGHT / 2, 'background').setOrigin(0.5)

        this.mainContainer.add([background])
    }
}
