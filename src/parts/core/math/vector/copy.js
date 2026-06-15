if (typeof VECTOR_OR_NUMBER === "number" || typeof VECTOR_OR_NUMBER === "bigint")
 return VECTOR_OR_NUMBER

if (!Array.isArray(VECTOR_OR_NUMBER.data) || VECTOR_OR_NUMBER.data.length > 4 || VECTOR_OR_NUMBER.data.length < 2)
 throw error(`unsupported input type`)

return Vector[VECTOR_OR_NUMBER.data.length](...VECTOR_OR_NUMBER.data)