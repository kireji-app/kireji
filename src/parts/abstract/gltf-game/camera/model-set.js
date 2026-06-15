const { x, y } = MODEL

thisGLTFGameCamera.x.smooth = Math.min(Math.max(x, -90), 90)
thisGLTFGameCamera.y.smooth = KMath.mod(y, 360)

const newCameraRID = thisGLTFGameCamera.modelToRID({ x, y })

if (newCameraRID !== thisGLTFGameCamera.rid)
 thisGLTFGameCamera.setRID(newCameraRID, false, true)