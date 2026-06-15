if (typeof VECTOR_OR_NUMBER_A !== typeof VECTOR_OR_NUMBER_B)
 throw error(`the two inputs must be of the same type`)

if (typeof VECTOR_OR_NUMBER_A === "number")
 return VECTOR_OR_NUMBER_A * VECTOR_OR_NUMBER_B

if (VECTOR_OR_NUMBER_A.data.length !== VECTOR_OR_NUMBER_B.data.length)
 throw error(`the two vectors must have the same dimension`)

return KMath.sum(Vector.multiply(VECTOR_OR_NUMBER_A, VECTOR_OR_NUMBER_B).data)