VECTOR_OR_NUMBER = Vector.abs(VECTOR_OR_NUMBER)

let index = 0
Vector.forEachPointInHyperrectangle(
 Vector.multiply(VECTOR_OR_NUMBER, 2),
 vectorOrNumber => {
  vectorOrNumber = Vector.subtract(vectorOrNumber, VECTOR_OR_NUMBER)
  if (Vector.isInHyperellipsoid(vectorOrNumber, VECTOR_OR_NUMBER))
   VECTOR_LOOP_CALLBACK(vectorOrNumber, index++)
 }
)