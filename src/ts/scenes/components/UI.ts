import 'phaser'
import { CONSTANTS } from '../../constants/constants'
import { EventsList } from '../../constants/events'
import { IUI } from '../../constants/interfaces'
import { CommonUtils } from '../../utils/CommonUtils'
import { IResult } from '../../utils/ResultsGenerator'

export class UI extends Phaser.GameObjects.Container implements IUI {
    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x, y)
        this.createElements()
        // TODO: remove this if this component becomes a child of some other container
        this.scene.add.existing(this)
    }

    private createElements(): void {
        const WIDTH = this.scene.sys.canvas.width
        const HEIGHT = this.scene.sys.canvas.height

        CommonUtils.emitter.on(EventsList.roundResults, (result: IResult) => {
            console.log(`Round results: ${JSON.stringify(result)}`)
        })

        const logo = this.scene.add.image(WIDTH / 2, 200, 'logo')
        const btnSpin = this.scene.add
            .image(WIDTH / 2, HEIGHT - 100, CONSTANTS.BUTTON_STATES.TEXTURE, CONSTANTS.BUTTON_STATES.SPIN.IDLE)
            .setInteractive()
            .on('pointerdown', (pointer) => {
                pointer.event.stopPropagation()
                btnSpin.setFrame(CONSTANTS.BUTTON_STATES.SPIN.DOWN)
            })
            .on('pointerup', (pointer) => {
                pointer.event.stopPropagation()
                btnSpin.setFrame(CONSTANTS.BUTTON_STATES.SPIN.DISABLED)
                CommonUtils.emitter.emit(EventsList.startSpin)
                CommonUtils.emitter.emit(EventsList.genereteRoundResults)
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

        const btnStop = this.scene.add
            .image(WIDTH / 2 + 200, HEIGHT - 100, CONSTANTS.BUTTON_STATES.TEXTURE, CONSTANTS.BUTTON_STATES.STOP.DISABLED)
            .setInteractive()
            .on('pointerup', (pointer) => {
                pointer.event.stopPropagation()
                CommonUtils.emitter.emit(EventsList.stopSpin)
            })

        const btnMaxBet = this.scene.add
            .image(WIDTH / 2 - 200, HEIGHT - 100, CONSTANTS.BUTTON_STATES.TEXTURE, CONSTANTS.BUTTON_STATES.MAX_BET.IDLE)
            .setInteractive()
            .on('pointerup', (pointer) => {
                pointer.event.stopPropagation()
                CommonUtils.emitter.emit(EventsList.startWinAnimation)
            })

        const btnMaxBet2 = this.scene.add
            .image(WIDTH / 2 - 400, HEIGHT - 100, CONSTANTS.BUTTON_STATES.TEXTURE, CONSTANTS.BUTTON_STATES.MAX_BET.DISABLED)
            .setInteractive()
            .on('pointerup', (pointer) => {
                pointer.event.stopPropagation()
                CommonUtils.emitter.emit(EventsList.stopWinAnimation)
            })
        const btnMute = this.scene.add
            .image(WIDTH / 2 + 400, HEIGHT - 100, CONSTANTS.BUTTON_STATES.TEXTURE, CONSTANTS.BUTTON_STATES.MUTE.IDLE)
            .setInteractive()
            .on('pointerup', (pointer) => {
                pointer.event.stopPropagation()
                CommonUtils.emitter.emit(EventsList.notify, 'Text message Text message Text')
            })

        this.add([logo, btnSpin, btnStop, btnMaxBet, btnMaxBet2, btnMute])
    }
}
