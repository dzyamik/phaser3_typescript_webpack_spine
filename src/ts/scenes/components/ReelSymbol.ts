import { EventsList } from '../../constants/events'
import { IReelSymbol } from '../../constants/interfaces'
import { CommonUtils } from '../../utils/CommonUtils'

export class ReelSymbol extends Phaser.GameObjects.Container implements IReelSymbol {
    private symbolName: string = ''
    private anim: Phaser.Tweens.Tween
    constructor(scene: Phaser.Scene, x: number, y: number, symbolName: string) {
        super(scene, x, y)
        this.symbolName = symbolName
        this.createElements()
    }

    private createElements(): void {
        const sym = this.scene.add.image(0, 0, 'symbols', `${this.symbolName}.png`).setOrigin(0, 0)
        this.add([sym])

        this.createAnimation()

        CommonUtils.emitter.on(EventsList.stopWinAnimation, () => {
            this.stopAnimation()
        })
    }

    private createAnimation(): void {
        this.anim = this.scene.add.tween({
            targets: [this],
            duration: 500,
            scale: 1.2,
            yoyo: true,
            repeat: 0,
            ease: 'Ease.In',
            onYoyo: () => {},
        })
        this.anim.stop(0)
    }

    public playWin(): void {
        this.anim.play()
    }

    private stopAnimation(): void {
        this.anim.stop(0)
    }
}
