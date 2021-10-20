# Phaser 3 Webpack 5 Boilerplate

Get up and running with Phaser 3 using TypeScript or JavaScript ES6.

This Webpack setup takes care of your code bundling and local development server.

Included are some handy class files, extending Phaser 3's Scene classes.

## Dependencies

Hints for Windows users:

-   You need to install [Node.js](https://nodejs.org/en/)
-   Use [Git Bash](https://git-scm.com/download/win) instead of Command Line or Powershell
-   IMA-ADPCM (the fastest iPhone format) will only be generated if you are using OSX.

Hints for VScode users:

-   set such properties in `settings.json` file of VScode

```json
{
    "editor.formatOnSave": true,
    "editor.semanticHighlighting.enabled": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "files.eol": "\n"
}
```

## Installation

Ensure you have [Node.js 14.17.3+ LTS](https://nodejs.org) installed.

Clone this repo and `cd` to project directory.

```bash
npm install
```

## Tasks

Pack all assets:

```bash
build:assets
```

Pack all assets and run development server:

```bash
start:all
```

Run development server to preview locally at http://localhost:8080/.

```bash
npm start
```

Create a production build.

```bash
npm run build
```

Validate code (static analizer)

```bash
npm run lint
```

## Common assets structure

This structure should be released in each game separately. If some folder is empty - delete it. Put all assets in `src/assets/source` and run commad `gulp` to build all assets into older `src/assets/final`

```
assets
+-- source
|   +-- html_assets
|   |   +-- images
|   |   |   +-- image001.png
|   |   |   +-- image002.jpg
|   |   |   +-- image003.jpeg
|   |   +-- fonts
|   |   |   +-- CommonFont.eot
|   |   |   +-- CommonFont.svg
|   |   |   +-- CommonFont.ttf
|   |   |   +-- CommonFont.woff
|   |   |   +-- CommonFont.woff2
|   +-- common
|   |   +-- preloading
|   |   |   +-- atlases
|   |   |   |   +-- manyImages001
|   |   |   |   |   +-- imageToAtlas001.png
|   |   |   |   |   +-- imageToAtlas002.png
|   |   |   |   |   +-- imageToAtlas003.png
|   |   |   |   |   +-- imageToAtlas004.png
|   |   |   |   |   +-- imageToAtlas005.png
|   |   |   |   |   +-- imageToAtlas006.png
|   |   |   +-- images
|   |   |   |   +-- image004.png
|   |   |   |   +-- image005.jpg
|   |   |   |   +-- image006.jpeg
|   |   +-- loading
|   |   |   +-- images
|   |   |   |   +-- image007.png
|   |   |   |   +-- image008.jpg
|   |   |   |   +-- image009.jpeg
|   |   |   +-- atlases
|   |   |   |   +-- manyImages002
|   |   |   |   |   +-- imageToAtlas001.png
|   |   |   |   |   +-- imageToAtlas002.png
|   |   |   |   |   +-- imageToAtlas003.png
|   |   |   |   |   +-- imageToAtlas004.png
|   |   |   |   |   +-- imageToAtlas005.png
|   |   |   |   |   +-- imageToAtlas006.png
|   |   |   +-- spine
|   |   |   |   +-- anim001.atlas
|   |   |   |   +-- anim001.json
|   |   |   |   +-- anim001.png
|   |   |   +-- particles
|   |   |   |   +-- part001.json
|   |   |   |   +-- part001.png
|   |   |   +-- audio
|   |   |   |   +-- sounds
|   |   |   |   |   +-- sound001.wav
|   |   |   |   |   +-- sound002.wav
|   |   |   |   |   +-- sound003.wav
|   |   |   |   |   +-- sound004.wav
|   |   |   |   |   +-- sound005.wav
|   |   |   |   +-- music
|   |   |   |   |   +-- music001.mp3
|   |   |   |   |   +-- music002.mp3
+-- final
|   +-- html_assets
|   |   +-- images
|   |   |   +-- image001.png
|   |   |   +-- image002.jpg
|   |   |   +-- image003.jpeg
|   |   +-- fonts
|   |   |   +-- CommonFont.eot
|   |   |   +-- CommonFont.svg
|   |   |   +-- CommonFont.ttf
|   |   |   +-- CommonFont.woff
|   |   |   +-- CommonFont.woff2
|   +-- common
|   |   +-- preloading
|   |   |   +-- atlases
|   |   |   |   +-- manyImages001.json
|   |   |   |   +-- manyImages001.png
|   |   |   +-- images
|   |   |   |   +-- image004.png
|   |   |   |   +-- image005.jpg
|   |   |   |   +-- image006.jpeg
|   |   +-- loading
|   |   |   +-- images
|   |   |   |   +-- image007.png
|   |   |   |   +-- image008.jpg
|   |   |   |   +-- image009.jpeg
|   |   |   +-- atlases
|   |   |   |   +-- manyImages002.json
|   |   |   |   +-- manyImages002.png
|   |   |   +-- spine
|   |   |   |   +-- anim001.atlas
|   |   |   |   +-- anim001.json
|   |   |   |   +-- anim001.png
|   |   |   +-- particles
|   |   |   |   +-- part001.json
|   |   |   |   +-- part001.png
|   |   |   +-- audio
|   |   |   |   +-- sounds
|   |   |   |   |   +-- soundsprite.ac3
|   |   |   |   |   +-- soundsprite.json
|   |   |   |   |   +-- soundsprite.m4a
|   |   |   |   |   +-- soundsprite.mp3
|   |   |   |   |   +-- soundsprite.ogg
|   |   |   |   +-- music
|   |   |   |   |   +-- music001.mp3
|   |   |   |   |   +-- music002.mp3
```
