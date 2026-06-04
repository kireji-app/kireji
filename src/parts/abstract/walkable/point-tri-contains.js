const flooredZ = Math.floor(POINT.z)
const triData = thisWalkable.triTable[TRI_INDEX]

if (flooredZ < triData.zRange.min || flooredZ > triData.zRange.max)
 return false

const row = triData.rows[flooredZ - triData.zRange.min]

if (!row)
 return false

const roundedX = Math.floor(POINT.x)

return roundedX >= row.xyRange.min.x && roundedX <= row.xyRange.max.x