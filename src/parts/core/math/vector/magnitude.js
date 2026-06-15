if (typeof VECTOR_OR_NUMBER === "number")
 return VECTOR_OR_NUMBER

return Math.sqrt(Vector.dot(VECTOR_OR_NUMBER, VECTOR_OR_NUMBER))