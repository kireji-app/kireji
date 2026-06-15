document.body.classList.remove("paused")

/* The fullscreen flow that ended up working was:
Safari:     await requestPointerLock then await requestFullscreen
Not Safari: await requestFullscreen then await requestPointerLock */

if (!document.pointerLockElement) {
 await thisGLTFGame.container.requestPointerLock({
  unadjustedMovement: true,
 })
}

Q("#pause-menu").classList.add("played")