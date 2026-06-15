if (HotKeys.pressed.has("Escape")) {

 thisGLTFGame.pauseAsync()
 return
}

/** A normalized vector representing the player's movement direction. */
const forceVector = (() => {
 const sensitivity = thisGLTFGame.manifest.keyboardSensitivity
 const facingVector = thisGLTFGame.camera.model
 const acceleration = 850
 const maxTurnSpeed = 250

 // For non-accellerating arrow key turning.
 // if (HotKeys.pressed.has("ArrowRight")) facingVector.y += sensitivity
 // if (HotKeys.pressed.has("ArrowLeft")) facingVector.y -= sensitivity

 const horizontalInput = HotKeys.pressed.has("ArrowRight") ? 1 : (HotKeys.pressed.has("ArrowLeft") ? -1 : 0)

 // 2. Accelerate or Decelerate
 if (horizontalInput != 0) {

  if (Math.sign(horizontalInput) !== Math.sign(thisGLTFGame.currentTurnSpeed))
   thisGLTFGame.currentTurnSpeed = 0

  thisGLTFGame.currentTurnSpeed += horizontalInput * acceleration * Client.deltaTime / 1000
  thisGLTFGame.currentTurnSpeed = Math.max(Math.min(thisGLTFGame.currentTurnSpeed, maxTurnSpeed), -maxTurnSpeed)
 } else {
  thisGLTFGame.currentTurnSpeed = 0
 }

 if (HotKeys.pressed.has("ArrowUp")) facingVector.x -= sensitivity
 if (HotKeys.pressed.has("ArrowDown")) facingVector.x += sensitivity

 facingVector.y += thisGLTFGame.currentTurnSpeed * Client.deltaTime / 1000

 thisGLTFGame.camera.setModel(facingVector)

 const yaw = -facingVector.y * Math.PI / 180

 // The keyboard might be controlling the player character.
 const WASDVector = Vector.xyz()
 if (HotKeys.pressed.has("KeyA")) WASDVector.x -= 1
 if (HotKeys.pressed.has("KeyD")) WASDVector.x += 1
 if (HotKeys.pressed.has("KeyW")) WASDVector.z -= 1
 if (HotKeys.pressed.has("KeyS")) WASDVector.z += 1

 const controlVector = Vector.normalize(Vector.xyz(
  WASDVector.x * Math.cos(yaw) + WASDVector.z * Math.sin(yaw),
  0,
  -WASDVector.x * Math.sin(yaw) + WASDVector.z * Math.cos(yaw)
 ))

 const isSprinting = HotKeys.pressed.has("ShiftLeft") || HotKeys.pressed.has("ShiftRight")

 return Vector.multiply(controlVector, isSprinting ? thisGLTFGame.manifest.sprintingSpeed : thisGLTFGame.manifest.walkingSpeed)
})()

const adjustedSpeed = Vector.magnitude(forceVector)

if (adjustedSpeed === 0) {
 // Nothing is happening.
 return
}


// Cast a ray to determine how this force vector will reposition the player.
const { hit, triIndex, point, forceVector: outputForceVector } = thisGLTFGame.levels.arm.castRay(forceVector, Client.deltaTime / 1000, true)

// if (!hit) {
//  const distance = Vector.magnitude(Vector.subtract(thisGLTFGame.levels.arm.position, point))
// }

// Distribute the runtime state.
thisGLTFGame.levels.arm.position.x = point.x
thisGLTFGame.levels.arm.position.y = point.y
thisGLTFGame.levels.arm.position.z = point.z
thisGLTFGame.levels.arm.triIndex = triIndex

// Move the world to the tri and point provided by the ray cast results.
const triData = thisGLTFGame.levels.arm.triTable[triIndex]
const row = triData.rows[Math.floor(point.z) - triData.zRange.min]
const newRID = triData.offset + row.offset + BigInt(Math.floor(point.x) - row.xyRange.min.x)
if (newRID !== thisGLTFGame.levels.arm.rid)
 thisGLTFGame.levels.arm.setRID(newRID, false, true)
/* else
 thisGLTFGame.levels.arm.updateView() */