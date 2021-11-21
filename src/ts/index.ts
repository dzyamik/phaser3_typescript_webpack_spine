import 'phaser'
import 'phaser/plugins/spine/dist/SpinePlugin'

import Preloader from './scenes/Preloader'
import Loader from './scenes/Loader'
import Game from './scenes/Game'
import { CommonUtils } from './utils/CommonUtils'
import { TRANSITIONS } from './constants/transitions'
import { CommunicationService } from './utils/CommunicationService'

const GAME_WIDTH = 1920
const GAME_HEIGHT = 1080

CommonUtils.init(TRANSITIONS)
CommunicationService.initialValidation('Prototype')

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    banner: false,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
    },
    antialias: true,
    scene: [Preloader, Loader, Game],
    plugins: {
        scene: [
            {
                key: SpinePlugin.name,
                plugin: SpinePlugin,
                mapping: 'spine',
            },
        ],
    },
    autoFocus: true,
    audio: {
        disableWebAudio: false,
    },
    fps: {
        target: 60,
        min: 30,
    },
    transparent: true,
    disableContextMenu: true,
}

const game = new Phaser.Game(config)
export default game
