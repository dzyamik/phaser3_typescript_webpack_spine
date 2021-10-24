import 'phaser'
import { CONSTANTS } from '../../constants/constants'
import { IUI } from '../../constants/interfaces'

export class UI extends Phaser.GameObjects.Container implements IUI {
    private mainContainer: Phaser.GameObjects.Container

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x, y)
        this.createElements()
    }

    private createElements(): void {
        this.mainContainer = this.scene.add.container(0, 0)
        const WIDTH = this.scene.sys.canvas.width
        const HEIGHT = this.scene.sys.canvas.height

        const logo = this.scene.add.image(WIDTH / 2, 200, 'logo')
        const btnSpin = this.scene.add
            .image(WIDTH / 2, HEIGHT / 2, CONSTANTS.BUTTON_STATES.TEXTURE, CONSTANTS.BUTTON_STATES.SPIN.IDLE)
            .setInteractive()
            .on('pointerdown', (pointer) => {
                pointer.event.stopPropagation()
                btnSpin.setFrame(CONSTANTS.BUTTON_STATES.SPIN.DOWN)
            })
            .on('pointerup', (pointer) => {
                pointer.event.stopPropagation()
                btnSpin.setFrame(CONSTANTS.BUTTON_STATES.SPIN.DISABLED)
            })
            // .on('pointerover', () => {
            //     btnSpin.setFrame(CONSTANTS.BUTTON_STATES.SPIN.OVER)
            // })
            .on('pointerout', () => {
                btnSpin.setFrame(CONSTANTS.BUTTON_STATES.SPIN.IDLE)
            })
            .on('pointercancel', () => {
                btnSpin.setFrame(CONSTANTS.BUTTON_STATES.SPIN.IDLE)
            })

        this.mainContainer.add([logo, btnSpin])
    }
}
