thisGLTFGame.camera.setModel(
 Vector.add(
  Vector.xyz(thisGLTFGame.camera.model.x, thisGLTFGame.camera.model.y, thisGLTFGame.camera.model.z),
  Vector.multiply(
   Vector.xyz(MOUSE_MOVEMENT_Y, MOUSE_MOVEMENT_X),
   thisGLTFGame.manifest.mouseSensitivity
  )
 )
)