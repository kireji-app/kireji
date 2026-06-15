const canvasRect = thisGLTFGame.onscreenContext.canvas.getBoundingClientRect()

const newCanvasWidth = Math.ceil(canvasRect.width / thisGLTFGame.camera.manifest.pixelRatio)
const newCanvasHeight = Math.ceil(canvasRect.height / thisGLTFGame.camera.manifest.pixelRatio)

thisGLTFGame.onscreenContext.canvas.width = thisGLTFGame.offscreenContext.canvas.width = newCanvasWidth
thisGLTFGame.onscreenContext.canvas.height = thisGLTFGame.offscreenContext.canvas.height = newCanvasHeight