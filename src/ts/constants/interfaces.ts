// NOTE: if you change interfaces and get errors in console, stop rebuild and start it again
export interface IBackground extends Phaser.GameObjects.Container {
    // TODO: implement any public functions
}

export interface IUI extends Phaser.GameObjects.Container {
    // TODO: implement any public functions
}

export interface IEventDispatcher extends Phaser.Events.EventEmitter {
    getState: Function
}

export interface ITransition<STATE, EVENT> {
    fromState: STATE
    event: EVENT
    toState: STATE
    cb?: (...args: any[]) => void | Promise<void>
}
