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

export const Rules = {
    main: {
        gameType: GameType.slot,
        winType: WinType.lines,
        reelsConfig: [3, 3, 3, 3, 3],
        symbols: {
            s_10: {
                id: 0,
                payouts: [0, 2, 4, 10, 15],
                isWild: false,
                isScatter: false,
            },
            s_k: {
                id: 1,
                payouts: [0, 2, 4, 10, 15],
                isWild: false,
                isScatter: false,
            },
            s_a: {
                id: 2,
                payouts: [0, 2, 4, 10, 15],
                isWild: false,
                isScatter: false,
            },
            s_cherry: {
                id: 3,
                payouts: [0, 2, 4, 10, 15],
                isWild: false,
                isScatter: false,
            },
            s_grape: {
                id: 4,
                payouts: [0, 2, 4, 10, 15],
                isWild: false,
                isScatter: false,
            },
            s_lemon: {
                id: 5,
                payouts: [0, 2, 4, 10, 15],
                isWild: false,
                isScatter: false,
            },
            s_orange: {
                id: 6,
                payouts: [0, 2, 4, 10, 15],
                isWild: false,
                isScatter: false,
            },
            s_plum: {
                id: 7,
                payouts: [0, 0, 0, 0, 0],
                isWild: true,
                substituteFor: ['s_orange', 's_10', 's_k', 's_a', 's_cherry', 's_grape', 's_lemon'],
                isScatter: false,
            },
            s_hen: {
                id: 8,
                payouts: [0, 0, 0, 0, 0],
                isWild: false,
                isScatter: true,
                triggerGames: {
                    freespin: [3, 4],
                    bonus: [2, 5],
                },
            },
        },
        // by sumbol ids
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
        winType: WinType.lines,
        reelsConfig: [3, 3, 3, 3, 3],
        symbols: {
            s_10: {
                id: 0,
                payouts: [0, 2, 4, 10, 15],
                isWild: false,
                isScatter: false,
            },
            s_k: {
                id: 1,
                payouts: [0, 2, 4, 10, 15],
                isWild: false,
                isScatter: false,
            },
            s_a: {
                id: 2,
                payouts: [0, 2, 4, 10, 15],
                isWild: false,
                isScatter: false,
            },
            s_cherry: {
                id: 3,
                payouts: [0, 2, 4, 10, 15],
                isWild: false,
                isScatter: false,
            },
            s_grape: {
                id: 4,
                payouts: [0, 2, 4, 10, 15],
                isWild: false,
                isScatter: false,
            },
            s_lemon: {
                id: 5,
                payouts: [0, 2, 4, 10, 15],
                isWild: false,
                isScatter: false,
            },
            s_orange: {
                id: 6,
                payouts: [0, 2, 4, 10, 15],
                isWild: false,
                isScatter: false,
            },
            s_plum: {
                id: 7,
                payouts: [0, 0, 0, 0, 0],
                isWild: true,
                substituteFor: ['s_orange', 's_10', 's_k', 's_a', 's_cherry', 's_grape', 's_lemon'],
                isScatter: false,
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
