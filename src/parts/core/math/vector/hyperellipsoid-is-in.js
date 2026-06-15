// Map the hyperellipsoid point to a point in the unit hypersphere.
VECTOR_OR_NUMBER_A = Vector.divide(VECTOR_OR_NUMBER_A, Vector.abs(VECTOR_OR_NUMBER_B))

return Vector.dot(VECTOR_OR_NUMBER_A, VECTOR_OR_NUMBER_A) <= 1