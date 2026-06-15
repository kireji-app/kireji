thisGLTFGameLevel.element = Q("world-")
thisGLTFGameLevel.camera = Vector.multiply(thisGLTFGameLevel.position, -1)
thisGLTFGameLevel.viewedTriIndex = thisGLTFGameLevel.triIndex
thisGLTFGameLevel.viewedPosition = Vector.copy(thisGLTFGameLevel.position)