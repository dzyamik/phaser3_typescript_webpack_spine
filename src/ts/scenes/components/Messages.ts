import { EventsList } from '../../constants/events'
import { IMessages } from '../../constants/interfaces'
import TEXT_STYLE from '../../constants/textStyle'
import { CommonUtils } from '../../utils/CommonUtils'
export class Messages extends Phaser.GameObjects.Container implements IMessages {
    private eventsCatcher: Phaser.GameObjects.Graphics
    private message: Phaser.GameObjects.Text
    private WIDTH: number
    private HEIGHT: number

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x, y)
        this.createElements()
        this.scene.add.existing(this)
    }

    private createElements(): void {
        this.WIDTH = this.scene.sys.canvas.width
        this.HEIGHT = this.scene.sys.canvas.height
        this.eventsCatcher = this.scene.make.graphics({})
        this.eventsCatcher.fillStyle(0x000000, 0.5)
        this.eventsCatcher.fillRect(0, 0, this.WIDTH, this.HEIGHT)

        this.message = this.scene.add.text(this.WIDTH / 2, this.HEIGHT / 2, '', TEXT_STYLE.MESSAGE).setOrigin(0.5)

        this.add([this.eventsCatcher, this.message])

        CommonUtils.emitter.on(EventsList.notify, (message: string) => {
            this.showMessage(message)
        })

        this.message.setInteractive().on('pointerdown', (pointer) => {
            pointer.event.stopPropagation()
            this.closeMessage()
        })

        this.closeMessage()
    }

    private showMessage(message: string): void {
        CommonUtils.updateText(this.message, message, this.WIDTH / 2)
        this.setVisible(true)
    }

    private closeMessage(): void {
        this.setVisible(false)
    }
}
