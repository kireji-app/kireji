if (thisGLTFGame.loading) {
 thisGLTFGame.onscreenContext.canvas.classList.add("loading")
 debug('loading for 1 frame')
 return
} else {
 thisGLTFGame.onscreenContext.canvas.classList.remove("loading")
}

let skipFrame = true

if (thisGLTFGame.loadedLevel !== thisGLTFGame.levels.arm) {
 skipFrame = false
 thisGLTFGame.loadedLevel = thisGLTFGame.levels.arm
 thisGLTFGame.loadLevelAsync()
 return
}

if (thisGLTFGame.canvasSizeChanged) {
 skipFrame = false
 thisGLTFGame.updateCanvasSize()
 thisGLTFGame.canvasSizeChanged = false
}

if (document.body.classList.contains("paused") && skipFrame)
 return

thisGLTFGame.reactToKeyboardInput()
thisGLTFGame.updateUniformBuffer()
thisGLTFGame.render()

if (thisGLTFGame.manifest.debug)
 thisGLTFGame.updateDebugView()