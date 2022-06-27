import { EventsList } from '../constants/events'
import { GameType, Rules } from '../constants/rules'
import { CommonUtils } from './CommonUtils'

export class ServerService {
    constructor() {}

    private static CONFIG = {
        gameName: 'Protorype',
    }

    private static STATE: any = {
        scene: 'main',
        gameType: GameType.slot,
        manualActions: ['spin', 'volume', 'changeBet', 'changeLines'],
        manualActionsOnEnd: ['spin', 'volume', 'changeBet', 'changeLines'],
        autoAction: [],
        config: {
            balance: 1000,
            bet: 10,
            betMult: 25,
            lines: 25,
            symbolIndexOnReels: [0, 5, 3, 10, 15],
            // TODO: make proper win combination presentation
            winCombos: [],
        },
    }

    private static RULES = Rules
    private static DATA = {
        config: {
            config: ServerService.CONFIG,
            rules: ServerService.RULES,
        },
        state: ServerService.STATE,
    }

    public static init() {
        // CommonUtils.emitter.on(EventsList.updateDataRequest, () => {
        //     CommonUtils.emitter.emit(EventsList.updateDataResponce, ServerService.DATA)
        // })
    }

    public static getData(info?: any) {
        if (info) {
            ServerService.processNewState(info)
        } else {
            CommonUtils.emitter.emit(EventsList.updateDataResponce, ServerService.DATA)
        }
    }

    private static processNewState(info) {
        // config: {
        //     balance: 1000,
        //     bet: 10,
        //     lines: 25,
        //     symbolIndexOnReels: [0, 5, 3, 10, 15],
        //     // TODO: make proper win combination presentation
        //     winCombos: [],
        // },
        const newState: any = {}
        newState.config = {}
        newState.config.bet = ServerService.STATE.config.bet
        newState.config.balance = ServerService.STATE.config.balance
        newState.config.lines = ServerService.STATE.config.lines
        newState.config.betMult = ServerService.STATE.config.betMult

        if (info.bet) {
            newState.config.bet = info.bet
            newState.config.balance = ServerService.STATE.config.balance - info.bet
        }

        if (info.lines) {
            newState.config.lines = info.lines
            // TODO: make proper calculation for bet mult
            newState.config.betMult = info.lines
        }

        ServerService.DATA = {
            config: {
                config: ServerService.CONFIG,
                rules: ServerService.RULES,
            },
            state: ServerService.STATE,
        }

        CommonUtils.emitter.emit(EventsList.updateDataResponce, ServerService.DATA)
    }
}
