// Map the hyperellipsoid point to a point in the unit hypersphere.
VECTOR_OR_NUMBER_A = Vector.divide(VECTOR_OR_NUMBER_A, Vector.abs(VECTOR_OR_NUMBER_B))

if (typeof VECTOR_OR_NUMBER_A === "number")
 return VECTOR_OR_NUMBER_A >= 0 ? 0 : Math.PI

if (VECTOR_OR_NUMBER_A.data.length === 2)
 return Math.atan2(VECTOR_OR_NUMBER_A.y, VECTOR_OR_NUMBER_A.x)

if (VECTOR_OR_NUMBER_A.data.length === 3)
 return Vector.xy(
  Math.atan2(Vector.magnitude(VECTOR_OR_NUMBER_A.xy), VECTOR_OR_NUMBER_A.z),
  Math.atan2(VECTOR_OR_NUMBER_A.y, VECTOR_OR_NUMBER_A.x)
 )

return Vector.xyz(
 Math.atan2(Vector.magnitude(VECTOR_OR_NUMBER_A.xyz), VECTOR_OR_NUMBER_A.w),
 Math.atan2(Vector.magnitude(VECTOR_OR_NUMBER_A.xy), VECTOR_OR_NUMBER_A.z),
 Math.atan2(VECTOR_OR_NUMBER_A.y, VECTOR_OR_NUMBER_A.x)
)