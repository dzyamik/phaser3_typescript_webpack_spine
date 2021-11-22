// NOTE: if you change interfaces and get errors in console, stop rebuild and start it again
export interface IBase extends Phaser.GameObjects.Container {
    // TODO: implement any public functions
}

export interface ILineMap {
    x: number
    y: number
}
export interface IBackground extends IBase {
    // TODO: implement any public functions
}

export interface IUI extends IBase {
    // TODO: implement any public functions
}

export interface IReelSymbol extends IBase {
    // TODO: implement any public functions
}

export interface IReelLine extends IBase {
    // TODO: implement any public functions
}

export interface IReel extends IBase {
    // TODO: implement any public functions
}

export interface IReelManager extends IBase {
    // TODO: implement any public functions
}

export interface IMessages extends IBase {
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

export interface IReelRules {
    gameType: string
    winType: string
    reelsConfig: Array<number>
    symbols: any
    symbolsById: any
    reelstrips: Array<Array<number>>
}