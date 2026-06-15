base()

const onscreenCanvas = Q("#onscreen-canvas")
const offscreenCanvas = new OffscreenCanvas(64, 64)

thisGLTFGame.onscreenContext = onscreenCanvas.getContext("2d")
thisGLTFGame.offscreenContext = offscreenCanvas.getContext('webgpu')

thisGLTFGame.offscreenContext.configure({
 device: Graphics.device,
 format: 'bgra8unorm',
 usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC,
 alphaMode: 'premultiplied'
})

thisGLTFGame.uniformBuffer = Graphics.createBuffer(thisGLTFGame.camera.buffer, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST)

addEventListener("resize", () => thisGLTFGame.reactToCanvasChange())

thisGLTFGame.container.addEventListener('mousemove', mouseEvent => {
 if (document.pointerLockElement === thisGLTFGame.container)
  thisGLTFGame.reactToMouseMovement(mouseEvent.movementX, mouseEvent.movementY)
})

thisGLTFGame.container.addEventListener('pointerdown', pointerEvent => {
 if (document.pointerLockElement === thisGLTFGame.container)
  thisGLTFGame.actionPoint(pointerEvent, thisGLTFGame.container)
})

function reactivePause() {
 if (document.body.classList.contains("paused"))
  return

 if (!document.pointerLockElement)
  thisGLTFGame.pauseAsync()
}

document.addEventListener('pointerlockchange', reactivePause)
document.addEventListener('pointerlockerror', reactivePause)
document.addEventListener('visibilitychange', reactivePause)
window.addEventListener('blur', reactivePause)
window.addEventListener('focus', reactivePause)