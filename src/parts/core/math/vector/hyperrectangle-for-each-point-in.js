if (typeof VECTOR_OR_NUMBER === "number") {

 for (let number = 0; number <= VECTOR_OR_NUMBER; number++)
  VECTOR_LOOP_CALLBACK(number, number)

 return
}

const point = Vector.copy(VECTOR_OR_NUMBER)

let index = 0

function loopOverDimension(dimensionIndex) {

 if (dimensionIndex === VECTOR_OR_NUMBER.data.length) {
  VECTOR_LOOP_CALLBACK(Vector.copy(point), index++)
  return
 }

 for (let dimensionCoordinate = 0; dimensionCoordinate <= VECTOR_OR_NUMBER.data[dimensionIndex]; dimensionCoordinate++) {
  point.data[dimensionIndex] = dimensionCoordinate
  loopOverDimension(dimensionIndex + 1)
 }
}

loopOverDimension(0)