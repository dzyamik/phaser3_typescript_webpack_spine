import { EventsList } from '../constants/events'
import { CommonUtils } from './CommonUtils'
import { ServerService } from './ServerService'

export class CommunicationService {
    constructor() {}

    private static _GAME_DATA: any = {}
    public static get gameData(): any {
        return CommunicationService._GAME_DATA
    }

    public static set gameData(data: any) {
        CommunicationService._GAME_DATA = data
    }

    public static init() {
        CommonUtils.emitter.on(EventsList.updateDataRequest, (info?: any) => {
            ServerService.getData(info)
        })

        CommonUtils.emitter.on(EventsList.updateDataResponce, (data: any) => {
            CommonUtils.extend(CommunicationService.gameData, CommunicationService.gameData, data)
            CommonUtils.emitter.emit(EventsList.setData, CommunicationService.gameData)
            console.error(CommunicationService.gameData)
        })

        CommonUtils.emitter.once(EventsList.getInitState, () => {
            CommonUtils.emitter.emit(EventsList.setState, CommunicationService.gameData.state)
        })

        // init parameters from server
        CommonUtils.emitter.emit(EventsList.updateDataRequest)
    }

    public static updateGameConfig() {}

    public static updateGameState() {}
}
