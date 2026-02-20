const roundedY = Math.round(POINT.y)

if (roundedY < TRIANGLE.minY || roundedY > TRIANGLE.maxY)
 return false

const row = TRIANGLE.rows[roundedY - TRIANGLE.minY]

if (!row)
 return false

const roundedX = Math.round(POINT.x)

return roundedX >= row.xMin && roundedX <= row.xMax