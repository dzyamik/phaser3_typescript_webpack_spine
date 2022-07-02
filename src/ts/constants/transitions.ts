import game from '..'
import { CommonUtils } from '../utils/CommonUtils'
import { ServerService } from '../utils/ServerService'
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
        game.scene.remove('Preloader')
    }),
    tFrom(States.LOADING, EventsList.gameOpening, States.GAME_OPENING, () => {
        game.scene.start('Game')
    }),
    tFrom(States.GAME_OPENING, EventsList.gameOpened, States.GAME_OPENED, () => {
        game.scene.remove('Loader')
        CommonUtils.emitter.emit(EventsList.getInitState)
    }),

    tFrom(States.GAME_OPENED, EventsList.idle, States.IDLE, () => {
        // Init state is set
    }),

    // In gema transitions
    tFrom(States.IDLE, EventsList.startSpin, States.START_SPIN, (info: any) => {
        CommonUtils.emitter.emit(EventsList.spinning, info)
    }),
    tFrom(States.START_SPIN, EventsList.spinning, States.SPINNING, (info: any) => {
        ServerService.getData(info)
    }),
    tFrom(States.SPINNING, EventsList.stopSpin, States.STOP_SPIN, (info: any) => {
        console.error(info)
    }),
    tFrom(States.STOP_SPIN, EventsList.spinStopped, States.SPIN_STOPPED, () => {
        CommonUtils.emitter.emit(EventsList.payout)
    }),
    tFrom(States.SPIN_STOPPED, EventsList.payout, States.PAYOUT, () => {
        // TODO: add some logic here
        CommonUtils.emitter.emit(EventsList.idle)
    }),
    tFrom(States.PAYOUT, EventsList.idle, States.IDLE, () => {}),
]
