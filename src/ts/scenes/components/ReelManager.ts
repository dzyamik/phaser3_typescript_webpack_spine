import { CONSTANTS } from '../../constants/constants'
import { EventsList } from '../../constants/events'
import { ILineMap, IReel, IReelLine, IReelManager } from '../../constants/interfaces'
import { CommonUtils } from '../../utils/CommonUtils'
import { CommunicationService } from '../../utils/CommunicationService'
import { Reel } from './Reel'
import { ReelLine } from './ReelLine'

export class ReelManager extends Phaser.GameObjects.Container implements IReelManager {
    private reels: Array<IReel> = []
    private lines: Array<IReelLine> = []
    private rules: any

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x, y)
        if (CommunicationService.gameData) {
            this.createElements(CommunicationService.gameData.config.rules)
            this.scene.add.existing(this)
        } else {
            CommonUtils.emitter.once(EventsList.setData, (data) => {
                this.createElements(data.config.rules)
                this.scene.add.existing(this)
            })
        }
    }

    private createElements(rules): void {
        this.rules = rules
        const SIZE = CONSTANTS.SIZE
        for (let r = 0; r < SIZE.NUM_OF_REELS; r++) {
            const reel = new Reel(this.scene, rules, r, SIZE.REELS_INIT_X + r * SIZE.REEL_WIDTH, SIZE.REELS_INIT_Y)
            this.reels.push(reel)
            this.add([reel])
        }

        // TODO: add mechanism for showing lines on win event all together and one by one
        const linesPoints = rules.main.lines
        const linesMap: Array<Array<ILineMap>> = []
        for (let i = 0; i < linesPoints.length; i++) {
            linesMap.push([])
            for (let j = 0; j < linesPoints[i].length; j++) {
                linesMap[i].push({
                    x: SIZE.REELS_INIT_X + SIZE.REEL_WIDTH / 2 + j * SIZE.REEL_WIDTH,
                    y: SIZE.REELS_INIT_Y + SIZE.SYM_HEIGHT / 2 + linesPoints[i][j] * SIZE.SYM_HEIGHT,
                })
            }
            const line = new ReelLine(this.scene, 0, 0, i, linesMap[i]).setVisible(false)
            this.lines.push(line)
            this.add(line)
        }

        CommonUtils.emitter.on(EventsList.startWinAnimation, () => {
            this.startWinAnimation()
        })

        CommonUtils.emitter.on(EventsList.stopWinAnimation, () => {
            this.stopWinAnimation()
        })

        CommonUtils.emitter.on(EventsList.stopSpin, (data) => {
            // TODO: refactor it to correct indexes from results
            // console.error('Data from server:', data)
            // console.error('data.symbolIndexOnReels', data.state.config.symbolIndexOnReels)
            const indexes = data.state.config.symbolIndexOnReels
            for (let r = 0; r < indexes.length; r++) {
                const stopIndex = indexes[r]
                // const stopIndex = Math.floor(Math.random() * this.rules.main.reelstrips[r].length)
                this.reels[r].stopReel(stopIndex)
            }
            // CommonUtils.emitter.emit(CommunicationService.WAITINT_FOR, CommunicationService.gameData.state)
        })
    }

    // TODO: make correct animation
    private startWinAnimation(): void {
        for (let i = 0; i < this.lines.length; i++) {
            if (Math.random() > 0.8) {
                this.lines[i].setVisible(true)
            }
        }
    }

    private stopWinAnimation(): void {
        for (let i = 0; i < this.lines.length; i++) {
            this.lines[i].setVisible(false)
        }
    }
}
