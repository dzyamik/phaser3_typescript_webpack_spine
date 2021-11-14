import { IReel, IReelManager } from '../../constants/interfaces'
import { Reel } from './Reel'

export class ReelManager extends Phaser.GameObjects.Container implements IReelManager {
    private reels: Array<IReel> = []

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x, y)
        this.createElements()
        this.scene.add.existing(this)
    }

    private createElements(): void {
        const reel1 = new Reel(this.scene, 425, 600)
        this.reels.push(reel1)
        this.add([reel1])
    }
}
