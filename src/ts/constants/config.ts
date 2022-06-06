import { Rules } from './rules'

export const Config = {
    // all time constants are in ms
    reelSpinTime: 3000,
    reelSpinTimeQuick: 500,
    // delaying time of each reel in stopping sequence, for each reel, in common spinning
    reelStopDelay: [0, 200, 400, 600, 800],
    bouncing: {
        stop: {
            time: 300,
            // how deep reel will move backward first on start of spinning, in relative units, where 1 is a symbol height
            deep: 0.3,
        },
        start: {
            time: 300,
            // how deep reel will move forward on stopping of spinning, in relative units, where 1 is a symbol height
            deep: 0.3,
        },
    },
    winAnimRanking: {
        rankingMultiplier: [1, 3, 5, 10, 20],
        rankingDuration: [1500, 2000, 3000, 5000, 10000],
    },
    rules: Rules,
}
