import { IReel, IReelSymbol } from '../../constants/interfaces'
import { Rules } from '../../constants/rules'
import { ReelSymbol } from './Symbol'

export class Reel extends Phaser.GameObjects.Container implements IReel {
    private symbols: Array<IReelSymbol> = []
    // private symbolsContainer: Phaser.GameObjects.Container
    private symWidth: number = 200
    private symHeight: number = 150
    private symToShow: number = 3
    private allSymHeight: number = 450
    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x, y)
        this.allSymHeight = this.symHeight * this.symToShow
        this.createElements()
    }

    private createElements(): void {
        // this.symbolsContainer = this.scene.add.container(0, 0)
        // this.add([this.symbolsContainer])

        const mainRules = Rules.main
        const syms = mainRules.reelstrips[0]

        for (let i = 0; i < syms.length; i++) {
            const symbol = new ReelSymbol(this.scene, 0, -i * this.symHeight, mainRules.symbolsById[syms[i].toString()])
            this.symbols.push(symbol)
            // this.symbolsContainer.add([symbol])
            this.add([symbol])
        }

        this.createMask()
        this.moveSymbols()
    }

    private createMask(): void {
        const rect = this.scene.make.graphics({})
        rect.fillStyle(0x000000, 0)
        rect.fillRect(this.x, this.y - this.allSymHeight, this.symWidth, this.allSymHeight)

        const rectMask = new Phaser.Display.Masks.GeometryMask(this.scene, rect)

        this.setMask(rectMask)
    }

    private moveSymbols(): void {
        this.scene.add.tween({
            targets: [this],
            duration: 1000,
            y: this.y + this.allSymHeight,
            yoyo: true,
            repeat: -1,
            ease: 'Ease.In',
            onYoyo: () => {
                console.error('onYoyo')
            },
        })
    }
}
