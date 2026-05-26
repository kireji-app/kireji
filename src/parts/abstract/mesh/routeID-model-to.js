const triIndex = mesh.triThatContainsPoint(MODEL)
const triData = mesh.triTable[triIndex]
const row = triData.rows[Math.floor(MODEL.z) - triData.zRange.min]
return triData.offset + row.offset + BigInt(Math.floor(MODEL.x) - row.xyRange.min.x)