if (typeof TERM !== "number")
 throw error("the term must be a number")

if (typeof VECTOR_OR_NUMBER_A === "number") {

 if (typeof VECTOR_OR_NUMBER_B !== "number")
  throw error("can't mix vector and number inputs")

 return VECTOR_OR_NUMBER_A + (VECTOR_OR_NUMBER_B - VECTOR_OR_NUMBER_A) * TERM
}

const result = Vector.copy(VECTOR_OR_NUMBER_A)

result.data.forEach((v, i) => result.data[i] = v + (VECTOR_OR_NUMBER_B.data[i] - v) * TERM)

return result