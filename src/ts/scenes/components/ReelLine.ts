import { ILineMap, IReelLine } from '../../constants/interfaces'

export class ReelLine extends Phaser.GameObjects.Container implements IReelLine {
    private lineId: number = null
    private lineMap: Array<ILineMap> = []
    constructor(scene: Phaser.Scene, x: number, y: number, lineId: number, lineMap: Array<ILineMap>) {
        super(scene, x, y)
        this.lineId = lineId
        this.lineMap = lineMap
        this.createElements()
    }

    private createElements(): void {
        const line = this.scene.add.graphics()
        line.lineStyle(20, 0x2ecc40)
        line.beginPath()
        line.moveTo(this.lineMap[0].x, this.lineMap[0].y)
        for (let i = 1; i < this.lineMap.length; i++) {
            line.lineTo(this.lineMap[i].x, this.lineMap[i].y)
        }
        line.strokePath()
        this.add(line)
    }
}
