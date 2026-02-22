// TODO: Validate MODEL and handle out-of-range points.
const triIndex = mesh.triThatContainsPoint(MODEL)
const triData = mesh.triTable[triIndex]
const row = triData.rows[Math.floor(MODEL.y) - triData.range.min]
return triData.offset + row.offset + BigInt(Math.floor(MODEL.x) - row.range.min)