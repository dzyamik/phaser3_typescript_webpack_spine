import "phaser"
import { IBackground } from "../../constants/interfaces"

export class Background extends Phaser.GameObjects.Container implements IBackground {
    private mainContainer: Phaser.GameObjects.Container

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x, y)
        this.createElements()
    }

    private createElements(): void {
        this.mainContainer = this.scene.add.container(0, 0)

        const background = this.scene.add.image(this.scene.sys.canvas.width / 2, this.scene.sys.canvas.height / 2, 'background')
        .setOrigin(0.5)
        .setSize(this.scene.sys.canvas.width, this.scene.sys.canvas.height)
        console.log(background, this.scene.sys.canvas.width, this.scene.sys.canvas.height)
        // background.setSize(this.scene.sys.canvas.width, this.scene.sys.canvas.height)

        this.mainContainer.add([
            background,
        ])
    }
}