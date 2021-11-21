import { EventsList } from '../constants/events'
import { CommonUtils } from './CommonUtils'

export interface IRangeValue {
    min: number
    max: number
}

export interface winCombination {
    numberOfSymbols: number
    positions: Array<number>
    payout: number
    symbolId: number
}

export interface ILinesResult {
    totalWin: number
    allWinPositions: Array<Array<number>>
    winCombinations: Array<winCombination>
}

export interface IResult extends ILinesResult {
    reelsStops: Array<number>
    symbolsOnReels: Array<Array<number>>
}

export class ResultsGenerator {
    constructor() {}

    private static _REELS: Array<Array<number>> = []
    private static _LINES: Array<Array<number>> = []
    private static _ACTIVE_LINES: number = 0
    public static setActiveLines(value: number): void {
        ResultsGenerator._ACTIVE_LINES = value
    }

    private static _GAME_TYPE: string
    private static _WIN_TYPE: string
    private static _REELS_CONFIG: Array<number> = []
    private static _REELS_RANGES: Array<IRangeValue> = []
    private static _SYMBOLS: Array<any> = []
    private static _SYMBOLS_BY_ID: Array<any> = []

    public static setRules(rules: any): void {
        // console.error(rules)
        ResultsGenerator._REELS = rules.reelstrips
        ResultsGenerator._REELS_RANGES = []
        for (let i = 0; i < ResultsGenerator._REELS.length; i++) {
            ResultsGenerator._REELS_RANGES.push({
                min: 0,
                max: ResultsGenerator._REELS[i].length - 1,
            })
        }
        ResultsGenerator._LINES = rules.lines
        ResultsGenerator._ACTIVE_LINES = ResultsGenerator._LINES.length
        ResultsGenerator._GAME_TYPE = rules.gameType
        ResultsGenerator._WIN_TYPE = rules.winType
        ResultsGenerator._REELS_CONFIG = rules.reelsConfig
        ResultsGenerator._SYMBOLS = rules.symbols
        ResultsGenerator._SYMBOLS_BY_ID = rules.symbolsById

        // switch (rules.gameType) {
        //     case GameType.slot:
        //         break
        // }
    }

    public static getResults(): void {
        // let res = {}
        const reelsResults = ResultsGenerator.getReelsResults(ResultsGenerator._REELS_RANGES)
        const reelsMatrix = ResultsGenerator.createResultsMatrix(reelsResults, ResultsGenerator._REELS_CONFIG, ResultsGenerator._REELS)
        const winLines = ResultsGenerator.processWinLines(reelsMatrix, ResultsGenerator._LINES, ResultsGenerator._ACTIVE_LINES)

        const res = {
            ...winLines,
            reelsStops: reelsResults,
            symbolsOnReels: reelsMatrix,
        }

        // console.error(res)

        CommonUtils.emitter.emit(EventsList.roundResults, res)
    }

    private static processWinLines(reelsMatrix: Array<Array<number>>, lines: Array<Array<number>>, activeLines: number): ILinesResult {
        let res: ILinesResult = {
            totalWin: 0,
            winCombinations: [],
            allWinPositions: [],
        }

        let totalWin = 0
        let allWinPositions = []

        for (let i = 0; i < activeLines; i++) {
            const line = lines[i]
            const symbolId = reelsMatrix[0][line[0]]
            const payoutValues = ResultsGenerator._SYMBOLS[ResultsGenerator._SYMBOLS_BY_ID[symbolId]]['payouts']
            let symbolsOnLine = 1
            for (let j = 1; j < line.length; j++) {
                if (symbolId === reelsMatrix[j][line[j]]) {
                    symbolsOnLine++
                } else {
                    break
                }
            }

            const payout = payoutValues[symbolsOnLine - 1]

            if (payout > 0) {
                res.winCombinations.push({
                    numberOfSymbols: symbolsOnLine,
                    positions: line,
                    payout: payout,
                    symbolId: symbolId,
                })

                allWinPositions = ResultsGenerator.mergeMatrix(line.slice(0, symbolsOnLine), allWinPositions)

                totalWin += payout
            }
        }

        res.totalWin = totalWin
        res.allWinPositions = allWinPositions

        return res
    }

    private static mergeMatrix(matrixFrom: Array<number>, matrixTo: Array<Array<number>>): Array<Array<number>> {
        for (let i = 0; i < matrixFrom.length; i++) {
            const position = matrixFrom[i]
            let isNew = false
            if (!matrixTo[i]) {
                matrixTo[i] = []
            }

            if (matrixTo[i].length > 0) {
                for (let j = 0; j < matrixTo[i].length; j++) {
                    isNew = position !== matrixTo[i][j]
                    if (!isNew) {
                        break
                    }
                }
            }

            if (matrixTo[i].length === 0 || isNew) {
                matrixTo[i].push(position)
            }
        }

        return matrixTo
    }

    private static createResultsMatrix(
        reelsResults: Array<number>,
        reelsConfig: Array<number>,
        reels: Array<Array<number>>
    ): Array<Array<number>> {
        const res = []
        for (let i = 0; i < reelsResults.length; i++) {
            res.push([])
            for (let j = 0; j < reelsConfig[i]; j++) {
                let num = reels[i][reelsResults[i] + j]
                if (num === undefined) {
                    num = reels[i][j - 1]
                }

                res[i].push(num)
            }
        }

        return res
    }

    private static getReelsResults(range: Array<IRangeValue>): Array<number> {
        const res = []

        for (let i = 0; i < range.length; i++) {
            res.push(ResultsGenerator.getRandomIntInclusive(range[i].min, range[i].max))
        }

        return res
    }

    private static getRandomIntInclusive(min: number, max: number): number {
        min = Math.ceil(min)
        max = Math.floor(max)

        // The maximum is inclusive and the minimum is inclusive
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}
