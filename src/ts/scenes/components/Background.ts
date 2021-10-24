import 'phaser'
import { IBackground } from '../../constants/interfaces'

export class Background extends Phaser.GameObjects.Container implements IBackground {
    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x, y)
        this.createElements()
        // TODO: remove this if this component becomes a child of some other container
        this.scene.add.existing(this)
    }

    private createElements(): void {
        const WIDTH = this.scene.sys.canvas.width
        const HEIGHT = this.scene.sys.canvas.height

        const background = this.scene.add.image(WIDTH / 2, HEIGHT / 2, 'background').setOrigin(0.5)

        this.add([background])
    }
}
