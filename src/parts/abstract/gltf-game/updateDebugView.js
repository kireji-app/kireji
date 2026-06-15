const cameraGoal = Vector.multiply(thisGLTFGame.levels.arm.position, -1)
const epsilon = 0.00001
if (Math.abs(cameraGoal.x - thisGLTFGame.levels.arm.camera.x) > epsilon || Math.abs(cameraGoal.z - thisGLTFGame.levels.arm.camera.z) > epsilon) {
 const cameraSmoothing = Era.arm === Era.vintage ? 0 : 30 / Client.deltaTime
 thisGLTFGame.levels.arm.camera = Vector.multiply(Vector.add(Vector.multiply(thisGLTFGame.levels.arm.camera, cameraSmoothing), cameraGoal), 1 / (cameraSmoothing + 1))
 thisGLTFGame.levels.arm.element.style.setProperty("--x", thisGLTFGame.levels.arm.camera.x)
 thisGLTFGame.levels.arm.element.style.setProperty("--z", thisGLTFGame.levels.arm.camera.z)
 thisGLTFGame.levels.arm.element.style.setProperty("--user-x", Math.floor(thisGLTFGame.levels.arm.position.x))
 thisGLTFGame.levels.arm.element.style.setProperty("--user-z", Math.floor(thisGLTFGame.levels.arm.position.z))
 Q("ui->.debug").innerHTML = thisGLTFGame.levels.arm["coords.html"]
}

thisGLTFGame.levels.arm.element.style.setProperty("--angle", -thisGLTFGame.camera.y.model + "deg")

if (thisGLTFGame.levels.arm.viewedTriIndex !== thisGLTFGame.levels.arm.triIndex) {

 // Highlight the path that the player is currently on.
 Q("world->svg path.current").classList.remove("current")
 Q(`world->svg path[data-index="${thisGLTFGame.levels.arm.triIndex}"]`).classList.add("current")

 thisGLTFGame.levels.arm.viewedTriIndex = thisGLTFGame.levels.arm.triIndex
}

if (thisGLTFGame.levels.arm.viewedPosition.x !== thisGLTFGame.levels.arm.position.x || thisGLTFGame.levels.arm.viewedPosition.z !== thisGLTFGame.levels.arm.position.z) {

 // Move the single-pixel mark showing the player's position.
 Q(`world->svg #player-marker`).setAttribute("x", Math.floor(thisGLTFGame.levels.arm.position.x))
 Q(`world->svg #player-marker`).setAttribute("y", Math.floor(thisGLTFGame.levels.arm.position.z))

 thisGLTFGame.levels.arm.viewedPosition = Vector.copy(thisGLTFGame.levels.arm.position)
}