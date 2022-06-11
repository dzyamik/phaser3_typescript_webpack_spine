// these are the states
export const States = {
    // Loading states
    INIT: 'INIT',
    PRELOADING: 'PRELOADING',
    LOADING: 'LOADING',

    // Game init states for getting initial config and start game
    GAME_OPENING: 'GAME_OPENING',
    GAME_OPENED: 'GAME_OPENED',

    // In game (main) states
    IDLE: 'IDLE',
    START_SPIN: 'START_SPIN',
    SPINNING: 'SPINNING',
    STOP_SPIN: 'STOP_SPIN',
    SPIN_STOPPED: 'SPIN_STOPPED',
    PAYOUT: 'PAYOUT',
}
