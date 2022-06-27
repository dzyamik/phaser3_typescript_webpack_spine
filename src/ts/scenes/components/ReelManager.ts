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
        const SIZE = CONSTANTS.SIZE
        for (let r = 0; r < SIZE.NUM_OF_REELS; r++) {
            const reel = new Reel(this.scene, SIZE.REELS_INIT_X + r * SIZE.REEL_WIDTH, SIZE.REELS_INIT_Y)
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
                    y: SIZE.REELS_INIT_Y + SIZE.REEL_HEIGHT / 2 + linesPoints[i][j] * SIZE.REEL_HEIGHT,
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
