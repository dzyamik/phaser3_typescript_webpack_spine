import { EventsList } from '../constants/events'
import { CommonUtils } from './CommonUtils'
import { ResultsGenerator } from './ResultsGenerator'

export class CommunicationService {
    constructor() {}

    private static _GAME_STATE: any
    public static get gameState(): any {
        return CommunicationService._GAME_STATE
    }

    public static set gameState(state) {
        CommunicationService._GAME_STATE = state
    }

    private static _GAME_CONFIG: any
    public static get gameConfig(): any {
        return CommunicationService._GAME_CONFIG
    }

    public static set gameConfig(config: any) {
        CommunicationService._GAME_CONFIG = config
    }

    public static initialValidation() {
        CommonUtils.emitter.on(EventsList.getGameConfig, () => {
            CommonUtils.emitter.emit(EventsList.updateGameConfig, CommunicationService.gameConfig)
        })

        CommonUtils.emitter.on(EventsList.setGameConfig, (config: any) => {
            CommunicationService.gameConfig = config
            CommonUtils.emitter.emit(EventsList.updateGameConfig, CommunicationService.gameConfig)
        })

        // TODO: sync it with statemachine
        CommonUtils.emitter.on(EventsList.getGameState, (stateParameters?: any) => {
            console.error(stateParameters)
            // CommonUtils.emitter.emit(EventsList.updateGameState, CommunicationService.gameState)
        })

        CommonUtils.emitter.on(EventsList.setGameState, (state: any) => {
            CommunicationService.gameState = state
            CommonUtils.emitter.emit(EventsList.updateGameState, CommunicationService.gameState)
        })
        // CommonUtils.emitter.on(EventsList.setCurrentGameRules, (rules: any) => {
        // ResultsGenerator.setRules(rules)
        // })

        // CommonUtils.emitter.on(EventsList.genereteRoundResults, () => {
        //     ResultsGenerator.getResults()
        // })
    }

    public static updateGameConfig() {}

    public static updateGameState() {}
}
