import game from '..'
import { CommonUtils } from '../utils/CommonUtils'
import { tFrom } from '../utils/StateMachine'
import { EventsList } from './events'
import { States } from './states'

export const TRANSITIONS = [
    tFrom(States.INIT, EventsList.toPreloading, States.PRELOADING, () => {
        CommonUtils.emitter.emit(EventsList.preloading)
    }),
    tFrom(States.PRELOADING, EventsList.toLoading, States.LOADING, () => {
        CommonUtils.emitter.emit(EventsList.loading)
        game.scene.start('Loader')
    }),
    tFrom(States.LOADING, EventsList.gameOpening, States.GAME_OPENING, () => {
        game.scene.start('Game')
    }),
    tFrom(States.GAME_OPENING, EventsList.gameOpened, States.GAME_OPENED, () => {}),

    tFrom(States.GAME_OPENED, EventsList.idle, States.IDLE, () => {}),

    // In gema transitions
    tFrom(States.IDLE, EventsList.startSpin, States.START_SPIN, () => {}),
    tFrom(States.START_SPIN, EventsList.spinning, States.SPINNING, () => {}),
    tFrom(States.SPINNING, EventsList.stopSpin, States.STOP_SPIN, () => {}),
    tFrom(States.STOP_SPIN, EventsList.spinStopped, States.SPIN_STOPPED, () => {}),
    tFrom(States.SPIN_STOPPED, EventsList.payout, States.PAYOUT, () => {}),
    tFrom(States.PAYOUT, EventsList.idle, States.IDLE, () => {}),
]
