// Check current tri first.
if (thisWalkable.triIndex !== -1 && thisWalkable.triContainsPoint(thisWalkable.triIndex, POINT))
 return thisWalkable.triIndex

// Check all tris. 
for (let triIndex = 0; triIndex < thisWalkable.triTable.length; triIndex++)
 if (triIndex !== thisWalkable.triIndex && thisWalkable.triContainsPoint(triIndex, POINT))
  return triIndex

return -1