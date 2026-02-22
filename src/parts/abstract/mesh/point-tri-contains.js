const roundedY = Math.floor(POINT.y)
const triData = mesh.triTable[TRI_INDEX]

if (roundedY < triData.range.min || roundedY > triData.range.max)
 return false

const row = triData.rows[roundedY - triData.range.min]

if (!row)
 return false

const roundedX = Math.floor(POINT.x)

return roundedX >= row.range.min && roundedX <= row.range.max