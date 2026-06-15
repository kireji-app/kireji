if (typeof VECTOR_OR_NUMBER === "number")
 return +!!VECTOR_OR_NUMBER

const resultVector = Vector.copy(VECTOR_OR_NUMBER)
const magnitude = Vector.magnitude(VECTOR_OR_NUMBER)

if (magnitude)
 resultVector.data.forEach((_, index) => resultVector.data[index] /= magnitude)

return resultVector