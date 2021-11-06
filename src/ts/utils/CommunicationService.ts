import { EventsList } from '../constants/events'
import { CommonUtils } from './CommonUtils'

export class CommunicationService {
    static get GAME_NAME(): string {
        return this._GAME_NAME
    }

    private static _GAME_NAME = ''
    static set GAME_NAME(value: string) {
        this._GAME_NAME = value
    }

    constructor() {}

    private static _USER_INFO: any
    public static get userInfo(): any {
        return CommunicationService._USER_INFO
    }

    public static set userInfo(info: any) {
        CommunicationService._USER_INFO = info
    }

    private static _GAME_INFO: any
    public static get gamesInfo(): any {
        return CommunicationService._GAME_INFO
    }

    public static set gameInfo(info: any) {
        CommunicationService._GAME_INFO = info
    }

    public static initialValidation(GAME_NAME: string) {
        CommunicationService.GAME_NAME = GAME_NAME

        CommonUtils.emitter.on(EventsList.updateUserData, CommunicationService.updateUserData)
        CommonUtils.emitter.on(EventsList.updateGameData, CommunicationService.updateGameData)

        CommunicationService.updateUserData()
        CommunicationService.updateGameData()
    }

    public static updateUserData() {}

    public static updateGameData() {}
}
