if (typeof VECTOR_OR_NUMBER === "number") {

 // Binary operation on two numbers.
 if (typeof VECTOR_NUMBER_OR_OPERATION === "number")
  return VECTOR_OPERATION(VECTOR_OR_NUMBER, VECTOR_NUMBER_OR_OPERATION)

 // Unary operation on one number.
 if (typeof VECTOR_NUMBER_OR_OPERATION === "function")
  return VECTOR_NUMBER_OR_OPERATION(VECTOR_OR_NUMBER)

 // Binary operation on a number and a vector.
 const resultVector = Vector.copy(VECTOR_NUMBER_OR_OPERATION)
 resultVector.data.forEach((value, index) => resultVector.data[index] = VECTOR_OPERATION(VECTOR_OR_NUMBER, value))
 return resultVector
}

// Unary operation on a vector.
if (typeof VECTOR_NUMBER_OR_OPERATION === "function") {
 const resultVector = Vector.copy(VECTOR_OR_NUMBER)
 resultVector.data.forEach((value, index) => resultVector.data[index] = VECTOR_NUMBER_OR_OPERATION(value))
 return resultVector
}

// Binary operation on a vector and a number.
if (typeof VECTOR_NUMBER_OR_OPERATION === "number") {
 const resultVector = Vector.copy(VECTOR_OR_NUMBER)
 resultVector.data.forEach((value, index) => resultVector.data[index] = VECTOR_OPERATION(value, VECTOR_NUMBER_OR_OPERATION))
 return resultVector
}

// Binary operation on two vectors.
if (VECTOR_OR_NUMBER.data.length !== VECTOR_NUMBER_OR_OPERATION.data.length)
 throw error(`the two vectors do not have the same dimension`)
const resultVector = Vector.copy(VECTOR_OR_NUMBER)
resultVector.data.forEach((value, index) => resultVector.data[index] = VECTOR_OPERATION(value, VECTOR_NUMBER_OR_OPERATION.data[index]))
return resultVector