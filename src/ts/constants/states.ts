// these are the states
export const States = {
    // Loading states
    INIT: 'INIT',
    PRELOADING: 'PRELOADING',
    LOADING: 'LOADING',

    // Game init states for getting initial config and start game
    GAME_OPENING: 'GAME_OPENING',
    GAME_OPENED: 'GAME_OPENED',

    // In game (main)
    IDLE: 'IDLE',
    START_SPIN: 'START_SPIN',
    SPINNING: 'SPINNING',
    STOP_SPIN: 'STOP_SPIN',
    SPIN_STOPPED: 'SPIN_STOPPED',
    PAYOUT: 'PAYOUT',

    // In freespins
    // START_SPIN: 'START_SPIN',
    // SPINNING: 'SPINNING',
    // STOP_SPIN: 'STOP_SPIN',
    // SPIN_STOPPED: 'SPIN_STOPPED',
    // PAYOUT: 'PAYOUT',
    END_FREESPINS: 'END_FREESPINS',

    // in bonus game
    // PAYOUT: 'PAYOUT',
    // IDLE: 'IDLE',
    CHOOSE: 'CHOOSE',
    END_BONUS: 'END_BONUS',

    // in risk game
    // IDLE: 'IDLE',
    // CHOOSE: 'CHOOSE'
    // PAYOUT: 'PAYOUT',
    END_RISK: 'END_RISK',
}
