import { IEventDispatcher } from '../constants/interfaces'
import { StateMachine } from './StateMachine'

let instance = null

export class EventDispatcher extends Phaser.Events.EventEmitter implements IEventDispatcher {
    private _STATE_MACHINE: StateMachine<string, string>

    public getState(): string {
        return this._STATE_MACHINE.getState()
    }

    constructor(initState: string, transitions: any) {
        super()
        this._STATE_MACHINE = new StateMachine<string, string>(initState, transitions)
    }

    public static getInstance(initState: string, transitions: any) {
        if (instance == null) {
            instance = new EventDispatcher(initState, transitions)
        }

        return instance
    }

    emit(event: string | symbol, ...args: any[]): boolean {
        // debugging events
        console.error(event, args, this._STATE_MACHINE.getState())
        if (this._STATE_MACHINE.can(String(event))) {
            this._STATE_MACHINE.dispatch(String(event)).then(() => {
                console.log('Transition to State:', this._STATE_MACHINE.getState())
            })
        }

        return super.emit(event, ...args)
    }
}
