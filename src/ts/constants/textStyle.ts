import 'phaser'

const BASE_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: 'Arial',
    align: 'left',
}

const MESSAGE = {
    ...BASE_STYLE,
    align: 'center',
    color: '#ffffff',
    fontSize: '60px',
}

const TEXT_STYLE = {
    MESSAGE: MESSAGE,
}

export default TEXT_STYLE
