// Check current tri first.
if (walkable.triIndex !== -1 && walkable.triContainsPoint(walkable.triIndex, POINT))
 return walkable.triIndex

// Check all tris. 
for (let triIndex = 0; triIndex < walkable.triTable.length; triIndex++)
 if (triIndex !== walkable.triIndex && walkable.triContainsPoint(triIndex, POINT))
  return triIndex

return -1