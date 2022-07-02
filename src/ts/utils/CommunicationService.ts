import { EventsList } from '../constants/events'
import { CommonUtils } from './CommonUtils'
import { ServerService } from './ServerService'

export class CommunicationService {
    private static WAITINT_FOR: string = EventsList.setData
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
            CommonUtils.extend(CommunicationService.gameData, data)
            CommonUtils.emitter.emit(CommunicationService.WAITINT_FOR, CommunicationService.gameData)
            // console.error(CommunicationService.gameData)
        })

        CommonUtils.emitter.once(EventsList.getInitState, () => {
            CommunicationService.WAITINT_FOR = EventsList.setState
            CommonUtils.emitter.emit(CommunicationService.WAITINT_FOR, CommunicationService.gameData.state)
        })

        CommonUtils.emitter.on(EventsList.startSpin, () => {
            CommunicationService.WAITINT_FOR = EventsList.stopSpin
        })

        // init parameters from server
        CommonUtils.emitter.emit(EventsList.updateDataRequest)
    }

    public static updateGameConfig() {}

    public static updateGameState() {}
}
