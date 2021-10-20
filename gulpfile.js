const fs = require('fs')
const path = require('path')
const { series, src, dest, parallel } = require('gulp')
const texturePacker = require('gulp-free-tex-packer')
const audiosprite = require('audiosprite-ffmpeg')
const through = require('through2')

// const run2 = require('gulp-run')

const del = require('del')

let MAIN_GAME_PATH = '.'
let ASSETS_MAP_PATH = `${MAIN_GAME_PATH}/src/ts`
let ROOT = `${MAIN_GAME_PATH}/src/assets`
let SOURCE = `${ROOT}/source`
let CONTEXT = './assets'

let DIST = `${ROOT}/final`

let ATLAS_PATTERN_BASE = '/**/atlases/**'
let ATLAS_PATTERN = `${ATLAS_PATTERN_BASE}/*.*`

const SOUND_PATTERN_BASE = '/**/sounds/**'
const SOUND_PATTERN = `${SOUND_PATTERN_BASE}/*.*`

// Mapping of all files or file types
const ATLAS_FILES_PATH = {}
const SOUND_FILES_PATH = {}
const ALL_FILES_PATH = {}

// Cleaning all in {DIST} folder
function cleanDistFolder(cb) {
    del.sync([`${DIST}/**`])
    console.log(`Folder ${DIST} cleaned`)
    if (cb) {
        cb()
    }
}

// Copying all into {DIST} folder from {SOURCE} folder
function copyAll(cb) {
    src(`${SOURCE}/**/*.*`)
        .pipe(dest(DIST))
        .on('finish', () => {
            console.log('Copy all')
            cb()
        })
}

// Create Soundsprites
const logSoundFiles = () => {
    return through.obj((file, enc, cb) => {
        const FilePathAndName = file.path.replace(new RegExp(/\\/, 'g'), '/')
        const FilePath = FilePathAndName.substring(0, FilePathAndName.lastIndexOf('/'))
        if (!SOUND_FILES_PATH[FilePath]) {
            SOUND_FILES_PATH[FilePath] = {
                name: FilePath.substring(FilePath.lastIndexOf('/') + 1),
                files: [],
            }
        }

        SOUND_FILES_PATH[FilePath].files.push(FilePathAndName)

        return cb(null, file)
    })
}

function buildSounds(cb) {
    src(`${DIST}${SOUND_PATTERN}`)
        .pipe(logSoundFiles())
        .pipe(dest(`${DIST}`))
        .on('end', () => {
            const keys = Object.keys(SOUND_FILES_PATH)
            // count - number of packed sounds, to execut callback at the end
            let count = 0
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i]
                const value = SOUND_FILES_PATH[key]

                const files = value.files
                const opts = {
                    output: `${key.substring(0, key.lastIndexOf('/'))}/${value.name}`,
                    path: '',
                    gap: 0.5,
                    channels: 1,
                }

                audiosprite(files, opts, (err, obj) => {
                    if (err) {
                        return console.error(err)
                    }

                    const jsonContent = JSON.stringify(obj, null, 2)
                    fs.writeFile(`${opts.output}.json`, jsonContent, 'utf8', () => {
                        console.log(`Soundsprite "${value.name}" is created`)

                        // delete unneccessary folders
                        del.sync([key])

                        if (count >= keys.length - 1) {
                            cb()
                        }

                        count++
                    })
                })
            }
            // use callback if no sounds
            if (keys.length < 1) {
                cb()
            }
        })
    console.log('buildSounds')
}

// Create Atlases
const logAtlasFiles = () => {
    return through.obj((file, enc, cb) => {
        const FilePathAndName = file.path.replace(new RegExp(/\\/, 'g'), '/')
        const FilePath = FilePathAndName.substring(0, FilePathAndName.lastIndexOf('/'))
        // const FileName = FilePathAndName.substring(FilePathAndName.lastIndexOf('\\') + 1)
        if (!ATLAS_FILES_PATH[FilePath]) {
            ATLAS_FILES_PATH[FilePath] = {
                name: FilePath.substring(FilePath.lastIndexOf('/') + 1),
                files: [],
            }
        }

        ATLAS_FILES_PATH[FilePath].files.push(FilePathAndName)

        return cb(null, file)
    })
}

function buildAtlases(cb) {
    src(`${DIST}${ATLAS_PATTERN}`)
        .pipe(logAtlasFiles())
        .pipe(dest(`${DIST}`))
        .on('end', () => {
            const keys = Object.keys(ATLAS_FILES_PATH)
            // count - number of packed atlases, to execut callback at the end
            let count = 0
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i]
                const value = ATLAS_FILES_PATH[key]
                src(`${key}/*.*`)
                    .pipe(
                        texturePacker({
                            // change textureName
                            textureName: `${value.name}`,
                            width: 4096,
                            height: 4096,
                            padding: 2,
                            extrude: 0,
                            allowRotation: false,
                            allowTrim: false,
                            exporter: 'Phaser3',
                            packer: 'MaxRectsPacker',
                            packerMethod: 'Smart',
                        })
                    )
                    .pipe(dest(`${key.substring(0, key.lastIndexOf('/'))}`))
                    .on('finish', () => {
                        console.log(`Atlas "${value.name}" is packed`)

                        // delete unneccessary folders
                        del.sync([key])

                        if (count >= keys.length - 1) {
                            cb()
                        }

                        count++
                    })
            }
            // use callback if no atlases
            if (keys.length < 1) {
                cb()
            }
        })

    console.log('buildAtlases')
}

// Directory mapping
const logAllFiles = () => {
    return through.obj((file, enc, cb) => {
        const FilePathAndName = file.path.replace(new RegExp(/\\/, 'g'), '/')
        const FilePath = FilePathAndName.substring(0, FilePathAndName.lastIndexOf('/'))
        const Category = FilePath.substring(FilePath.lastIndexOf('/') + 1)
        const PathToCategory = FilePath.substring(0, FilePath.lastIndexOf('/'))

        const FileName = FilePathAndName.substring(FilePathAndName.lastIndexOf('/') + 1)
        const Name = FileName.split('.')[0]
        const Ext = FileName.split('.')[1]

        let Categories = []
        let stringCategories = ''

        if (PathToCategory.indexOf('/html_assets') > -1) {
            stringCategories = PathToCategory.substring(PathToCategory.lastIndexOf('/html_assets') + 1)
        } else if (PathToCategory.indexOf('/common') > -1) {
            stringCategories = PathToCategory.substring(PathToCategory.lastIndexOf('/common') + 1)
        }

        Categories.push(...stringCategories.split('/'), Category)

        let currentCategoryLevelObject = ALL_FILES_PATH
        for (let i = 0; i < Categories.length; i++) {
            const catName = Categories[i]

            if (!currentCategoryLevelObject[catName]) {
                currentCategoryLevelObject[catName] = {}
            }

            currentCategoryLevelObject = currentCategoryLevelObject[catName]

            if (i === Categories.length - 1) {
                if (!currentCategoryLevelObject[Name]) {
                    switch (catName) {
                        case 'images':
                        case 'music':
                            currentCategoryLevelObject[Name] = FilePathAndName
                            break
                        case 'fonts':
                            currentCategoryLevelObject[Name] = []
                            break
                        case 'particles':
                        case 'atlases':
                            currentCategoryLevelObject[Name] = {
                                json: '',
                                png: [],
                            }
                            break
                        case 'spine':
                            currentCategoryLevelObject[Name] = {
                                json: '',
                                atlas: [],
                            }
                            break
                        case 'sounds':
                            currentCategoryLevelObject[Name] = {
                                json: '',
                                audio: [],
                            }
                            break
                    }
                }

                switch (catName) {
                    case 'particles':
                    case 'atlases':
                        if (Ext === 'json') {
                            currentCategoryLevelObject[Name][Ext] = FilePathAndName
                        } else if (Ext === 'png') {
                            currentCategoryLevelObject[Name][Ext].push(FilePathAndName)
                        }
                        break
                    case 'spine':
                        if (Ext === 'json') {
                            currentCategoryLevelObject[Name][Ext] = FilePathAndName
                        } else if (Ext === 'atlas') {
                            currentCategoryLevelObject[Name][Ext].push(FilePathAndName)
                        }
                        break
                    case 'sounds':
                        if (Ext === 'json') {
                            currentCategoryLevelObject[Name][Ext] = FilePathAndName
                        } else {
                            currentCategoryLevelObject[Name]['audio'].push(FilePathAndName)
                        }
                        break
                    case 'fonts':
                        currentCategoryLevelObject[Name].push(FilePathAndName)
                        break
                }
            }
        }

        return cb(null, file)
    })
}

function getDirectoryMap(cb) {
    src([`${DIST}/**/*.*`, `!${DIST}/*`])
        .pipe(logAllFiles())
        .pipe(dest(DIST))
        .on('finish', () => {
            // ALL_FILES_PATH['assets_root'] = CONTEXT
            const content = 'export const ASSETS = ' + JSON.stringify(ALL_FILES_PATH, null, 2)
            const correctedContent = content
                .replace(new RegExp(/\\\\/, 'g'), '/')
                .replace(new RegExp(path.resolve(DIST).replace(new RegExp(/\\/, 'g'), '/') + '/', 'g'), `${CONTEXT}/`)
                .replace(new RegExp(/\r\n/, 'g'), '\n')
            // and after clicking on file the setting for VScode returns to default

            fs.writeFile(`${ASSETS_MAP_PATH}/assets.ts`, correctedContent, 'utf8', () => {
                console.log('Assets map is created')
                cb()
            })
        })
}

// function runWebpackProd(cb) {
//     run2('webpack --mode production').exec()
//     cb()
// }

// function runWebpackDev(cb) {
//     run2('webpack serve --mode development').exec()
//     cb()
// }

// Exported tasks
exports.buildAtlasesDist = buildAtlases
exports.buildSoundsDist = buildSounds
exports.getDirectoryMapDist = getDirectoryMap

// exports.runWebpackProd = runWebpackProd
// exports.runWebpackDev = runWebpackDev
exports.copyAllDist = series(cleanDistFolder, copyAll)
exports.copyAllDist = series(cleanDistFolder, copyAll)

exports.default = series(cleanDistFolder, copyAll, parallel(buildAtlases, buildSounds), getDirectoryMap)

exports.assets = series(cleanDistFolder, copyAll, parallel(buildAtlases, buildSounds), getDirectoryMap)

exports.production = series(cleanDistFolder, copyAll, buildAtlases, buildSounds, getDirectoryMap /*runWebpackProd*/)
exports.development = series(cleanDistFolder, copyAll, parallel(buildAtlases, buildSounds), getDirectoryMap /*runWebpackDev*/)
