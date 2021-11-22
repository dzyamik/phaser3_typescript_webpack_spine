import { CONSTANTS } from '../../constants/constants'
import { IReel, IReelRules, IReelSymbol } from '../../constants/interfaces'
import { Rules } from '../../constants/rules'
import { CommonUtils } from '../../utils/CommonUtils'
import { ReelSymbol } from './ReelSymbol'
const SIZE = CONSTANTS.SIZE

export class Reel extends Phaser.GameObjects.Container implements IReel {
    private symbols: Array<IReelSymbol> = []
    private symWidth: number = SIZE.REEL_WIDTH
    private symHeight: number = SIZE.REEL_HEIGHT
    private symToShow: number = 3
    private allSymHeight: number = 450
    private anim: Phaser.Tweens.Tween

    private rules: IReelRules
    private syms: Array<number>
    private lastSymbol = 0

    constructor(scene: Phaser.Scene, x: number, y: number, index: number) {
        super(scene, x, y)
        this.symToShow = Rules.main.reelsConfig[ index ]
        this.allSymHeight = this.symHeight * this.symToShow

        this.rules = Rules.main
        this.syms = this.rules.reelstrips[ index ]

        this.createElements()
    }

    private createElements(): void {
        // TODO: create symbpls pool and show addthem one by one durind move animation
        for (let i = 0; i < this.syms.length; i++) {
            const symbol = new ReelSymbol(this.scene, 0, this.allSymHeight - i * this.symHeight, this.rules.symbolsById[ this.syms[ i ].toString() ])
            this.symbols.push(symbol)
            this.add([ symbol ])
        }

        this.createMask()
        this.createAnimation()
        CommonUtils.emitter.on('startSpin', () => {
            this.startAnimation(true)
        })
        CommonUtils.emitter.on('stopSpin', () => {
            this.startAnimation(false)
        })
    }

    private addSymbol(x: number, y: number, symbolIndex: number) {
        symbolIndex %= this.syms.length
        const symbol = new ReelSymbol(this.scene, x, y, Rules.main.symbolsById[ this.syms[ symbolIndex ].toString() ])
        this.symbols.push(symbol)
        this.add(symbol)
        this.lastSymbol = symbolIndex

        return symbol
    }

    private shiftSymbols() {
        this.remove(this.symbols[ 0 ])
        this.symbols.splice(0, 1)
    }

    private createMask(): void {
        const rect = this.scene.make.graphics({})
        rect.fillStyle(0x000000, 0)
        rect.fillRect(this.x, this.y, this.symWidth, this.allSymHeight)

        const rectMask = new Phaser.Display.Masks.GeometryMask(this.scene, rect)

        this.setMask(rectMask)
    }

    // TODO: override animations using symbols pool
    private createAnimation(): void {
        this.anim = this.scene.add.tween({
            targets: [ this ],
            duration: 1000,
            y: this.y + this.allSymHeight * 2,
            yoyo: true,
            repeat: -1,
            ease: 'Ease.In',
            onYoyo: () => { },
        })
        this.anim.stop(0)
    }

    private startAnimation(toStart: boolean = true): void {
        this.anim.stop(0)
        if (toStart) {
            this.anim.play()
        }
    }
}
