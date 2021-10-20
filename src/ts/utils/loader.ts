import 'phaser'

export default function loader(scene: Phaser.Scene, stage: 'loading' | 'preloading', assets: any = {}, commonPath = '') {
    if (commonPath.length && commonPath.slice(-1) !== '/') {
        commonPath += '/'
    }

    loadFolder(assets)

    function loadFolder(folderObject: Object, folderName = '') {
        switch (folderName) {
            case 'html_assets':
                return
            case 'atlases':
                return loadAtlases()
            case 'images':
                return loadImages()
            case 'spine':
                return loadSpine()
            case 'particles':
                return loadParticles()
            case 'sounds':
                return loadSounds()
            case 'music':
                return loadMusic()
            case 'loading':
            case 'preloading':
                if (folderName !== stage) {
                    return
                }
        }
        loadSubFolders()

        function loadImages() {
            Object.entries(folderObject).forEach(([name, value]) => {
                scene.load.image(name, absPath(value))
            })
        }

        function loadAtlases() {
            Object.entries(folderObject).forEach(([name, value]) => {
                scene.load.atlas(name, absPath(value.png), commonPath + value.json)
            })
        }

        function loadSpine() {
            Object.entries(folderObject).forEach(([name, value]) => {
                scene.load.spine(name, commonPath + value.json, absPath(value.atlas))
            })
        }

        function loadParticles() {
            Object.entries(folderObject).forEach(([name, value]) => {
                scene.load.image(name, value.png)
                scene.load.json(`${name}_json`, value.json)
            })
        }

        function loadSounds() {
            Object.entries(folderObject).forEach(([name, value]) => {
                scene.load.audioSprite(name, commonPath + value.json, absPath(value.audio))
            })
        }

        function loadMusic() {
            Object.entries(folderObject).forEach(([name, value]) => {
                scene.load.audio(name, absPath(value))
            })
        }

        function loadSubFolders() {
            if (!folderObject || typeof folderObject !== 'object' || Array.isArray(folderObject)) {
                console.error(folderObject, 'is not a sub-folder!')

                return
            }
            Object.entries(folderObject).forEach(([name, obj]) => {
                loadFolder(obj, name)
            })
        }

        function absPath(path: string | string[]) {
            if (typeof path === 'string') {
                return commonPath + path
            }

            return path.map((currentPath) => commonPath + currentPath)
        }
    }
}
