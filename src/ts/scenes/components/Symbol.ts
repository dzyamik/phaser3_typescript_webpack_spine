import { IReelSymbol } from '../../constants/interfaces'

export class ReelSymbol extends Phaser.GameObjects.Container implements IReelSymbol {
    private symbolName: string = ''
    constructor(scene: Phaser.Scene, x: number, y: number, symbolName: string) {
        super(scene, x, y)
        this.symbolName = symbolName
        this.createElements()
    }

    private createElements(): void {
        const sym1 = this.scene.add.image(0, 0, 'symbols', `${this.symbolName}.png`).setOrigin(0, 0)
        this.add([sym1])
    }
}
