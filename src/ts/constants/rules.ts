export const GameType = {
    slot: 'slot',
    bonus: 'bonus',
    freespin: 'freespin',
    riskgame: 'riskgame',
}

export const WinType = {
    lines: 'lines',
    ways: 'ways',
    random: 'random',
}

export const WinDirection = {
    leftToRight: 'leftToRight',
    rightToLeft: 'rightToLeft',
    bothWays: 'bothWays',
    anywhereOnField: 'anywhereOnField',
}

export const Rules = {
    main: {
        gameType: GameType.slot,
        winType: WinType.lines,
        reelsConfig: [3, 3, 3, 3, 3],
        symbols: {
            s_10: {
                id: 0,
                payouts: [0, 2, 4, 10, 15],
                direction: WinDirection.leftToRight,
                isWild: false,
                isScatter: false,
            },
            s_k: {
                id: 1,
                payouts: [0, 2, 4, 10, 15],
                direction: WinDirection.leftToRight,
                isWild: false,
                isScatter: false,
            },
            s_a: {
                id: 2,
                payouts: [0, 2, 4, 10, 15],
                direction: WinDirection.leftToRight,
                isWild: false,
                isScatter: false,
            },
            s_cherry: {
                id: 3,
                payouts: [0, 2, 4, 10, 15],
                direction: WinDirection.leftToRight,
                isWild: false,
                isScatter: false,
            },
            s_grape: {
                id: 4,
                payouts: [0, 2, 4, 10, 15],
                direction: WinDirection.leftToRight,
                isWild: false,
                isScatter: false,
            },
            s_lemon: {
                id: 5,
                payouts: [0, 2, 4, 10, 15],
                direction: WinDirection.leftToRight,
                isWild: false,
                isScatter: false,
            },
            s_orange: {
                id: 6,
                payouts: [0, 2, 4, 10, 15],
                direction: WinDirection.leftToRight,
                isWild: false,
                isScatter: false,
            },
            s_plum: {
                id: 7,
                payouts: [0, 0, 0, 0, 0],
                direction: WinDirection.leftToRight,
                isWild: true,
                substituteFor: ['s_orange', 's_10', 's_k', 's_a', 's_cherry', 's_grape', 's_lemon'],
                isScatter: false,
            },
            s_hen: {
                id: 8,
                payouts: [0, 0, 0, 0, 0],
                direction: WinDirection.bothWays,
                isWild: false,
                isScatter: true,
                triggerGames: [
                    null,
                    {
                        gameType: GameType.freespin,
                        parameters: {
                            numberOfGames: 5,
                            winMultiplier: 1,
                        },
                    },
                    {
                        gameType: GameType.bonus,
                        parameters: {
                            numberOfGames: 1,
                            winMultiplier: 1,
                        },
                    },
                    {
                        gameType: GameType.freespin,
                        parameters: {
                            numberOfGames: 15,
                            winMultiplier: 1,
                        },
                    },
                    {
                        gameType: GameType.bonus,
                        parameters: {
                            numberOfGames: 1,
                            winMultiplier: 3,
                        },
                    },
                ],
            },
        },
        symbolsById: {
            '0': 's_10',
            '1': 's_k',
            '2': 's_a',
            '3': 's_cherry',
            '4': 's_grape',
            '5': 's_lemon',
            '6': 's_orange',
            '7': 's_plum',
            '8': 's_hen',
        },
        // by symbol ids
        reelstrips: [
            [0, 4, 2, 5, 2, 2, 5, 6, 7, 8, 6, 4, 3, 2, 2, 4, 5, 5, 6, 1, 1, 1, 0, 0, 0, 8, 6, 5, 4, 3, 3],
            [0, 4, 2, 5, 2, 2, 5, 6, 7, 8, 6, 4, 3, 2, 2, 4, 5, 5, 6, 1, 1, 1, 0, 0, 0, 8, 6, 5, 4, 3, 3],
            [0, 4, 2, 5, 2, 2, 5, 6, 7, 8, 6, 4, 3, 2, 2, 4, 5, 5, 6, 1, 1, 1, 0, 0, 0, 8, 6, 5, 4, 3, 3],
            [0, 4, 2, 5, 2, 2, 5, 6, 7, 8, 6, 4, 3, 2, 2, 4, 5, 5, 6, 1, 1, 1, 0, 0, 0, 8, 6, 5, 4, 3, 3],
            [0, 4, 2, 5, 2, 2, 5, 6, 7, 8, 6, 4, 3, 2, 2, 4, 5, 5, 6, 1, 1, 1, 0, 0, 0, 8, 6, 5, 4, 3, 3],
        ],
        // top left position is 0
        lines: [
            // 5
            [0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1],
            [2, 2, 2, 2, 2],
            [0, 1, 2, 1, 0],
            [2, 1, 0, 1, 2],
            // 10
            [1, 1, 1, 1, 0],
            [1, 1, 1, 1, 2],
            [1, 0, 1, 0, 1],
            [0, 1, 0, 1, 0],
            [1, 2, 1, 2, 1],
            // 15
            [2, 1, 2, 1, 2],
            [2, 0, 2, 0, 2],
            [0, 2, 0, 2, 0],
            [1, 0, 2, 0, 1],
            [1, 2, 0, 2, 1],
            // 20
            [2, 2, 2, 1, 0],
            [2, 2, 2, 1, 1],
            [0, 0, 0, 1, 1],
            [0, 0, 0, 1, 2],
            [2, 1, 2, 2, 2],
            // 25
            [0, 1, 0, 0, 0],
            [1, 2, 1, 1, 1],
            [1, 0, 1, 1, 1],
            [2, 1, 1, 1, 1],
            [0, 1, 1, 1, 1],
        ],
    },
    freespin: {
        gameType: GameType.freespin,
        winType: WinType.ways,
        reelsConfig: [3, 3, 3, 3, 3],
        symbols: {
            s_10: {
                id: 0,
                payouts: [0, 2, 4, 10, 15],
                direction: WinDirection.leftToRight,
                isWild: false,
                isScatter: false,
            },
            s_k: {
                id: 1,
                payouts: [0, 2, 4, 10, 15],
                direction: WinDirection.leftToRight,
                isWild: false,
                isScatter: false,
            },
            s_a: {
                id: 2,
                payouts: [0, 2, 4, 10, 15],
                direction: WinDirection.leftToRight,
                isWild: false,
                isScatter: false,
            },
            s_cherry: {
                id: 3,
                payouts: [0, 2, 4, 10, 15],
                direction: WinDirection.leftToRight,
                isWild: false,
                isScatter: false,
            },
            s_grape: {
                id: 4,
                payouts: [0, 2, 4, 10, 15],
                direction: WinDirection.leftToRight,
                isWild: false,
                isScatter: false,
            },
            s_lemon: {
                id: 5,
                payouts: [0, 2, 4, 10, 15],
                direction: WinDirection.leftToRight,
                isWild: false,
                isScatter: false,
            },
            s_orange: {
                id: 6,
                payouts: [0, 2, 4, 10, 15],
                direction: WinDirection.leftToRight,
                isWild: false,
                isScatter: false,
            },
            s_plum: {
                id: 7,
                payouts: [0, 0, 0, 0, 0],
                direction: WinDirection.leftToRight,
                isWild: true,
                substituteFor: ['s_orange', 's_10', 's_k', 's_a', 's_cherry', 's_grape', 's_lemon'],
                isScatter: false,
            },
            s_hen: {
                id: 8,
                payouts: [0, 0, 0, 0, 0],
                direction: WinDirection.anywhereOnField,
                isWild: false,
                isScatter: true,
                triggerGames: [
                    null,
                    {
                        gameType: GameType.freespin,
                        parameters: {
                            numberOfGames: 5,
                            winMultiplier: 1,
                        },
                    },
                    {
                        gameType: GameType.bonus,
                        parameters: {
                            numberOfGames: 1,
                            winMultiplier: 1,
                        },
                    },
                    {
                        gameType: GameType.freespin,
                        parameters: {
                            numberOfGames: 15,
                            winMultiplier: 1,
                        },
                    },
                    {
                        gameType: GameType.bonus,
                        parameters: {
                            numberOfGames: 1,
                            winMultiplier: 3,
                        },
                    },
                ],
            },
        },
        // by sumbol ids
        reelstrips: [
            [0, 4, 2, 5, 2, 2, 5, 6, 7, 7, 6, 4, 3, 2, 2, 4, 5, 5, 6, 1, 1, 1, 0, 0, 0, 7, 6, 5, 4, 3, 3],
            [0, 4, 2, 5, 2, 2, 5, 6, 7, 7, 6, 4, 3, 2, 2, 4, 5, 5, 6, 1, 1, 1, 0, 0, 0, 7, 6, 5, 4, 3, 3],
            [0, 4, 2, 5, 2, 2, 5, 6, 7, 7, 6, 4, 3, 2, 2, 4, 5, 5, 6, 1, 1, 1, 0, 0, 0, 7, 6, 5, 4, 3, 3],
            [0, 4, 2, 5, 2, 2, 5, 6, 7, 7, 6, 4, 3, 2, 2, 4, 5, 5, 6, 1, 1, 1, 0, 0, 0, 7, 6, 5, 4, 3, 3],
            [0, 4, 2, 5, 2, 2, 5, 6, 7, 7, 6, 4, 3, 2, 2, 4, 5, 5, 6, 1, 1, 1, 0, 0, 0, 7, 6, 5, 4, 3, 3],
        ],
        symbolsById: {
            '0': 's_10',
            '1': 's_k',
            '2': 's_a',
            '3': 's_cherry',
            '4': 's_grape',
            '5': 's_lemon',
            '6': 's_orange',
            '7': 's_plum',
            '8': 's_hen',
        },
    },
    bonus: {
        gameType: GameType.bonus,
        winType: WinType.random,
        maxSteps: 2,
        choise: {
            box1: {
                multiplier: 1.5,
            },
            box2: {
                multiplier: 1.5,
            },
            box3: {
                multiplier: 6,
            },
        },
    },
    riskgame: {
        gameType: GameType.riskgame,
        winType: WinType.random,
        maxSteps: 5,
        choise: {
            red: {
                multiplier: 2,
            },
            black: {
                multiplier: 2,
            },
        },
    },
}

// regularMode: {
//     startDelay:     1, // временной промежуток между запусками риллов >= 1
//     startSpeed:     1, // скорость подъема >= 1
//     startFrameTick: 1, // время подъема >= 1
//     spinSpeed:      25, // скорость вращения
//     spinTime:       50, // время вращения
//     stopSpeed:      3, // скорость остановки (подъема наверх)
//     stopDeepCoef:   10, // глубина для пружинящего эффекта
//     stopDelay:      10, // временной промежуток остановки между риллами
//     animationDelay: 0 // промежуток времени между анимациями выигрышных символов
// },
// quickMode: {
//     startDelay:     1, // временной промежуток между запусками риллов >= 1
//     startSpeed:     1, // скорость подъема >= 1
//     startFrameTick: 1, // время подъема >= 1
//     spinSpeed:      30, // скорость вращения
//     spinTime:       20, // время вращения
//     stopSpeed:      3, // скорость остановки (подъема наверх)
//     stopDeepCoef:   10, // глубина для пружинящего эффекта
//     stopDelay:      5, // временной промежуток остановки между риллами
//     animationDelay: 0 // промежуток времени между анимациями выигрышных символов
// }
