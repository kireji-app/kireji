// TODO: Validate MODEL.
const triangle = mesh.triangles[MODEL.triangleIndex]
const row = triangle.rows[Math.round(MODEL.y) - triangle.minY]
return triangle.offset + row.offset + BigInt(Math.round(MODEL.x) - row.xMin)