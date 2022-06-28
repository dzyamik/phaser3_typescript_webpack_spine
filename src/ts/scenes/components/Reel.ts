import { CONSTANTS } from '../../constants/constants'
import { EventsList } from '../../constants/events'
import { IReel, IReelSymbol } from '../../constants/interfaces'
import { Rules } from '../../constants/rules'
import { CommonUtils } from '../../utils/CommonUtils'
import { ReelSymbol } from './ReelSymbol'
const SIZE = CONSTANTS.SIZE

export class Reel extends Phaser.GameObjects.Container implements IReel {
    private symbols: Array<IReelSymbol> = []
    private symbolsContainer: Phaser.GameObjects.Container
    private symWidth: number = SIZE.REEL_WIDTH
    private symHeight: number = SIZE.SYM_HEIGHT
    private allSymHeight: number = 450
    private anim: Phaser.Tweens.Tween
    private mainRules: any
    private rules: any
    private reelStrip: Array<number> = []
    private symbolsToShowIndexes: Array<number> = []
    private presevedSymUp: number = 1
    private presevedSymDown: number = 1
    private symToShow: number = 3
    // index in array of bottom visible symbol
    private currentIndex: number = 0
    private reelIndex: number = null
    private currentAnimationDuration: number = CONSTANTS.REEL_DURATION
    private stopIndex: number = null
    private stopSymbolsNumber: number = null
    private allowStopping: boolean = false

    constructor(scene: Phaser.Scene, rules, reelIndex, x?: number, y?: number) {
        super(scene, x, y)
        this.allSymHeight = this.symHeight * this.symToShow
        // this.rules = rules
        this.rules = Rules
        this.reelIndex = reelIndex
        this.mainRules = this.rules.main
        this.createElements()
    }

    private createElements(): void {
        this.symbolsContainer = this.scene.add.container(0, 0)
        this.reelStrip = this.mainRules.reelstrips[this.reelIndex]

        // TODO: create symbols pool and show addthem one by one durind move animation
        for (let i = 0; i < this.reelStrip.length; i++) {
            const symbol = new ReelSymbol(this.scene, 0, 0, this.mainRules.symbolsById[this.reelStrip[i].toString()])
            symbol.setVisible(false)
            this.symbols.push(symbol)
            this.symbolsContainer.add([symbol])
        }
        this.add(this.symbolsContainer)

        this.createMask()
        this.createAnimation()
        CommonUtils.emitter.on(EventsList.startSpin, () => {
            this.startAnimation(true)
        })
        CommonUtils.emitter.on(EventsList.stopSpin, () => {
            // TODO: refactor it to correct indexes from results
            this.stopIndex = Math.floor(Math.random() * this.reelStrip.length)
            console.error(
                this.reelIndex,
                this.stopIndex,
                this.reelStrip[this.stopIndex],
                this.mainRules.symbolsById[this.reelStrip[this.stopIndex].toString()]
            )
        })

        this.setSymPositions(this.currentIndex)
    }

    private setSymPositions(index: number): void {
        const indexes = this.getIndexes(index)
        // console.error(index, indexes)
        for (let i = 0; i < indexes.length; i++) {
            const symbol = this.symbols[indexes[i]]
            symbol.setX(0)
            // (i - this.presevedSymDown) is to start from hidden down symbol
            symbol.setY(this.allSymHeight - (i - this.presevedSymDown + 1) * this.symHeight)
            // console.error(symbol)
            symbol.setVisible(true)
        }
    }

    private getIndexes(currentIndex: number): Array<number> {
        const len = this.symToShow + this.presevedSymUp + this.presevedSymDown
        // getting indexes from initial point currentIndex
        this.currentIndex = currentIndex

        if (this.symbolsToShowIndexes.length > 0) {
            const lastIndex = this.symbolsToShowIndexes[this.symbolsToShowIndexes.length - 1]
            let newIndex = lastIndex + 1
            if (this.stopIndex !== null && this.allowStopping) {
                // first index in syquence is from hidden symbols
                newIndex = this.stopIndex - this.presevedSymDown
                this.stopIndex = null
                this.stopSymbolsNumber = len
            }
            this.symbolsToShowIndexes.push(this.getIndexFromArray(newIndex))
            this.symbolsToShowIndexes.shift()
        } else {
            let indexInArr = this.currentIndex - this.presevedSymDown
            for (let i = 0; i < len; i++) {
                this.symbolsToShowIndexes.push(this.getIndexFromArray(indexInArr))
                indexInArr++
            }
        }

        return this.symbolsToShowIndexes
    }

    private getIndexFromArray(rowIndex: number): number {
        let res = rowIndex
        if (rowIndex < 0) {
            res = this.reelStrip.length + rowIndex
        } else if (rowIndex >= this.reelStrip.length) {
            res = rowIndex - this.reelStrip.length
        }

        return res
    }

    private createMask(): void {
        const rect = this.scene.make.graphics({})
        rect.fillStyle(0x000000, 0)
        rect.fillRect(this.x - this.symWidth, this.y, this.symWidth * 3, this.allSymHeight)

        const rectMask = new Phaser.Display.Masks.GeometryMask(this.scene, rect)

        this.setMask(rectMask)
    }

    private incrementCurrentIndex() {
        this.currentIndex++
        if (this.currentIndex >= this.reelStrip.length) {
            this.currentIndex = 0
        }
    }

    private updateDuration() {
        this.currentAnimationDuration -= CONSTANTS.SYMBOL_DURATION

        if (this.currentAnimationDuration <= 0 && this.stopIndex !== null) {
            this.allowStopping = true
        }

        if (this.stopSymbolsNumber === null) {
            this.startAnimation(true)
        } else {
            this.stopSymbolsNumber--
            if (this.stopSymbolsNumber <= 0) {
                this.stopSymbolsNumber = null
                this.startAnimation(false)
                this.currentAnimationDuration = CONSTANTS.REEL_DURATION
                this.allowStopping = false
                this.stopIndex = null
            } else {
                this.startAnimation(true)
            }
        }
        // this.startAnimation(this.currentAnimationDuration > 0)

        // } else {
        // this.startAnimation(true)
        // }
    }

    private hideSymbols() {
        for (let i = 0; i < this.symbols.length; i++) {
            const symbol = this.symbols[i]
            symbol.setVisible(false)
        }
    }

    // TODO: override animations using symbols pool
    private createAnimation(): void {
        this.anim = this.scene.add.tween({
            // 1 is to set correct positions
            delay: 1 + CONSTANTS.DELAY * this.reelIndex,
            targets: this.symbolsContainer,
            duration: CONSTANTS.SYMBOL_DURATION,
            y: this.symHeight,
            // yoyo: true,
            repeat: -1,
            ease: 'Ease.In',
            onRepeat: () => {
                this.incrementCurrentIndex()
                this.symbolsContainer.setY(0)
                this.hideSymbols()
                this.setSymPositions(this.currentIndex)
                this.updateDuration()
            },
        })
        this.anim.stop(0)
    }

    private startAnimation(toStart: boolean = true): void {
        if (toStart) {
            this.anim.play()
        } else {
            this.anim.stop(0)
        }
    }
}
