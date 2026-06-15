Q("#pause-menu").innerHTML = thisGLTFGame["pause-menu.html"]

document.body.classList.add("paused")

if (document.pointerLockElement)
 await document.exitPointerLock()