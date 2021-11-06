import { ITransition } from '../constants/interfaces'
import { States } from '../constants/states'
import { EventDispatcher } from './EventDispatcher'

export class CommonUtils {
    private static _EMITTER = null
    private static TRANSITIONS: object

    public static get emitter() {
        return CommonUtils._EMITTER
    }

    private static _GAME_WIDTH: number
    public static get gameWidth(): number {
        return CommonUtils._GAME_WIDTH
    }

    private static _GAME_HEIGHT: number
    public static get gameHeight(): number {
        return CommonUtils._GAME_HEIGHT
    }

    public static setGameParameters(width: number, height: number) {
        CommonUtils._GAME_WIDTH = width
        CommonUtils._GAME_HEIGHT = height
    }

    private static _GAME_SCALE: number
    public static get gameScale() {
        return CommonUtils._GAME_SCALE
    }

    public static setGameScale(scale: number) {
        CommonUtils._GAME_SCALE = scale
    }

    private static _IS_MOBILE: boolean
    public static isMobile(): boolean {
        if (CommonUtils._IS_MOBILE === undefined) {
            CommonUtils._IS_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        }

        return CommonUtils._IS_MOBILE
    }

    constructor() {}

    public static init(TRANSITIONS: ITransition<string, string>[]) {
        this.TRANSITIONS = TRANSITIONS
        this._EMITTER = EventDispatcher.getInstance(States.INIT, this.TRANSITIONS)
    }

    public static updateTextSize(textObject: Phaser.GameObjects.Text, width: number): void {
        if (textObject.width >= width) {
            textObject.setDisplaySize(width, textObject.height)
        } else {
            textObject.setDisplaySize(textObject.width, textObject.height)
        }
    }

    public static updateText(textObject: Phaser.GameObjects.Text, text: string, width?: number): void {
        textObject.setText(text)
        if (width) {
            CommonUtils.updateTextSize(textObject, width)
        }
    }
}
