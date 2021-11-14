import { IMessages } from '../../constants/interfaces'

export class Messages extends Phaser.GameObjects.Container implements IMessages {
    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x, y)
        this.createElements()
        this.scene.add.existing(this)
    }

    private createElements(): void {}
}
