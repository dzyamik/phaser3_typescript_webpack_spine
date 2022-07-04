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
        console.error('getData', info)
        if (info) {
            ServerService.processNewState(info)
        } else {
            CommonUtils.emitter.emit(EventsList.updateDataResponce, ServerService.DATA)
        }
    }

    private static processNewState(info) {
        console.error('processNewState', info)
        // config: {
        //     balance: 1000,
        //     bet: 10,
        //     lines: 25,
        //     symbolIndexOnReels: [0, 5, 3, 10, 15],
        //     // TODO: make proper win combination presentation
        //     winCombos: [],
        // },
        const currentRules = ServerService.RULES.main
        const newState: any = {}
        newState.config = {}
        newState.config.bet = ServerService.STATE.config.bet
        newState.config.balance = ServerService.STATE.config.balance
        newState.config.lines = ServerService.STATE.config.lines
        newState.config.betMult = ServerService.STATE.config.betMult

        if (info.bet) {
            newState.config.bet = info.bet
            newState.config.balance = ServerService.STATE.config.balance - info.bet

            newState.config.symbolIndexOnReels = []

            const reelstrips = currentRules.reelstrips
            for (let i = 0; i < reelstrips.length; i++) {
                const len = reelstrips[i].length
                const newIndex = Math.floor(Math.random() * len)
                newState.config.symbolIndexOnReels.push(newIndex)
            }
            console.error(ServerService.processWin(newState.config.symbolIndexOnReels, currentRules))
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
            state: newState,
        }

        CommonUtils.emitter.emit(EventsList.updateDataResponce, ServerService.DATA)
    }

    private static processWin(indexes: Array<number>, rulesForGame: any): any {
        const res = {}
        console.error('indexes', indexes)
        const symbols = ServerService.getSymbols(indexes, rulesForGame)
        // res.indexes = symbols
        // res = {
        //     totalWin: Number,
        //     winCombos:{
        //         together: [
        //             [],
        //             [],
        //             [],
        //             [],
        //             []
        //         ],
        //         separate: []
        //     },
        //     transitionTo?: string
        // }

        return res
    }

    private static getSymbols(indexes: Array<number>, rulesForGame: any): Array<Array<string>> {
        const res = []
        const reelsConfig = rulesForGame.reelsConfig
        const reelstrips = rulesForGame.reelstrips
        // console.error('reelstrips', reelstrips)
        const symbolsById = rulesForGame.symbolsById

        for (let r = 0; r < reelsConfig.length; r++) {
            res.push([])
            for (let i = 0; i < reelsConfig[r]; i++) {
                res[r].push(ServerService.getIndexFromArray(indexes[r] + i, reelstrips[r]))
            }
        }

        const symIds = ServerService.toSymbolID(res, reelstrips)
        console.error('reel symbols', symIds)
        console.error(ServerService.getSymbolNames(symIds, symbolsById))

        return res
    }

    private static toSymbolID(indexes: Array<Array<number>>, reelstrips: Array<Array<number>>): Array<Array<number>> {
        const res = []
        console.error('indexes', indexes)
        for (let i = 0; i < indexes.length; i++) {
            res.push([])
            const reelstrip = reelstrips[i]
            for (let j = 0; j < indexes[i].length; j++) {
                res[i].push(reelstrip[indexes[i][j]])
            }
        }

        return res
    }

    private static getIndexFromArray(rowIndex: number, reelstrip: Array<number>): number {
        let res = rowIndex
        if (rowIndex < 0) {
            res = reelstrip.length + rowIndex
        } else if (rowIndex >= reelstrip.length) {
            res = rowIndex - reelstrip.length
        }

        return res
    }

    private static getSymbolNames(indexes: Array<Array<number>>, symbolsById: any): Array<Array<string>> {
        const res = []
        for (let i = 0; i < indexes.length; i++) {
            res.push([])
            for (let j = 0; j < indexes[i].length; j++) {
                res[i].push(symbolsById[String(indexes[i][j])])
            }
        }

        return res
    }
}
